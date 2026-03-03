const fs = require('fs')
const path = require('path');
const express = require('express');
const { execSync } = require('child_process');

const {getConnection} = require("./config/database");
const { log } = require('./utils/logger');

const MODULES_PATH = path.join(__dirname, '../modules');

const GlobalSettingsService = require('./services/GlobalSettingsService')

const app = express();
app.use(express.json());

class ModuleManager {
  constructor(app) {
    this.app = app;
    this.module = {};
  }

  async installModuleDependencies(moduleConfig) {
    const dependencies = moduleConfig.dependencies || {};
  
    for (const [pkg, version] of Object.entries(dependencies)) {
      try {
        require.resolve(pkg); // Проверка: если модуль найден — значит, он установлен
        log.info(`Dependency "${pkg}" is already installed.`);
      } catch (e) {
        const pkgToInstall = version && version !== '' ? `${pkg}@${version}` : pkg;
        try {
          log.info(`Installing missing dependency: ${pkgToInstall}...`);
          execSync(`npm install ${pkgToInstall}`, {
            cwd: process.cwd(), // Установка в корень проекта
            stdio: 'inherit'
          });
          log.info(`Installed "${pkgToInstall}"`);
        } catch (err) {
          console.error(`Failed to install "${pkgToInstall}":`, err);
        }
      }
    }
  }
  

  async findModules() {
    log.info(`Scanning modules...`);
  
    try {
      const modules = fs.readdirSync(MODULES_PATH);
  
      for (const module of modules) {
        const modulePath = path.join(MODULES_PATH, module);
        const configPath = path.join(modulePath, 'module.json');
  
        if (!fs.existsSync(configPath)) {
          log.error(`module.json not found [${module}]`);
          continue;
        }
  
        let moduleConfig;
        try {
          const configData = fs.readFileSync(configPath, 'utf-8'); // убрал await
          moduleConfig = JSON.parse(configData);

          //await this.installModuleDependencies(moduleConfig);
        } catch (err) {
          log.error(`Error parsing module.json [${module}]`, err);
          continue;
        }

        const connection = await getConnection();
        try {
          const [rows] = await connection.query('SELECT * FROM modules WHERE moduleName = ?', [moduleConfig.name]);

          if (rows.length === 0) {
            log.info(`Adding module [${moduleConfig.name}] to database`);

            await connection.query(`
              INSERT INTO modules (moduleName, route, version, isCore, enabled)
              VALUES (?, ?, ?, ?, ?)
            `, [
              moduleConfig.name,
              moduleConfig.route,
              moduleConfig.version,
              moduleConfig.enabled,
              moduleConfig.isCore,
            ]);

          } else {
            const existing = rows[0];
            if (existing.version !== moduleConfig.version || existing.title !== moduleConfig.title || existing.isCore !== (moduleConfig.isCore ? 1 : 0)) {
              log.info(`Updating module [${moduleConfig.name}] in database`);

              await connection.query(`
                UPDATE modules 
                SET route = ?, version = ?, enabled = ?, isCore = ?
                WHERE moduleName = ?
              `, [
                moduleConfig.route,
                moduleConfig.version,
                moduleConfig.enabled,
                moduleConfig.isCore,
                moduleConfig.name
              ]);
            }
          }

          log.info(`Module found: [${moduleConfig.name}], version: ${moduleConfig.version}`);
        } catch (err) {
          log.error(`Error processing module [${moduleConfig.name}]`, err);
        } finally {
          connection.release(); 
        }
      }
  
      log.info(`Module scanning completed: [${modules.length}]`);
    } catch (err) {
      log.error(`Error scanning modules:`, err);
    }
  }
  
  async checkEnabled(moduleName) {
    return async (req, res, next) => {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT enabled FROM modules WHERE moduleName = ?', [moduleName]);
            const module = rows[0];

            if (module && module.enabled === 1) {
                // Модуль включён, пропускаем запрос
                next();
            } else {
                // Модуль отключён, возвращаем ошибку 404
                //res.status(404).send(`Module [${moduleName}] is disabled`);
                res.render('disabled')
            }
        } catch (err) {
            console.error(`Error checking module status for ${moduleName}:`, err);
            res.status(500).send('Internal Server Error');
        } finally {
            connection.release();
        }
    }
}

  async loadModules(app) {
      const connection = await getConnection();
      const [modules] = await connection.query('SELECT moduleName, enabled, route FROM modules');
      connection.release();
      const viewsPaths = []
      const theme = await GlobalSettingsService.getCurrentTheme();
      const mainViewsPath = path.join(__dirname, '../views/theme', theme.value)
      const adminViewsPath = path.join(__dirname, '../views/admin')

      viewsPaths.push(mainViewsPath, adminViewsPath)

      for (const module of modules) {
        if (!module.enabled) {
          log.info(`Module [${module.moduleName}] is disabled and will not be loaded`);
          continue;
        }
        
        try {
            // Убедитесь, что путь правильный
            const moduleName = module.moduleName;
            const routePrefix = module.route;

            const modulePath = path.join(__dirname, '../modules', moduleName);
            const routesPath = path.join(modulePath, 'routes');

            const apiDirPath = path.join(routesPath, 'api');
            const viewDirPath = path.join(routesPath, 'views');
            const moduleViewsPath = path.join(modulePath, 'views');

            const enabledMiddleware = await this.checkEnabled(module.moduleName);

            // Динамически ищем все файлы в папке API и подключаем их
            if (fs.existsSync(apiDirPath)) {
              const apiFiles = fs.readdirSync(apiDirPath);
              
              for (const file of apiFiles) {
                const apiFilePath = path.join(apiDirPath, file);
                if (path.extname(file) === '.js') {
                  const apiRoutes = require(apiFilePath);
                  app.use(`/api${routePrefix}`, enabledMiddleware, apiRoutes);
                }
              }
            }

            // Динамически ищем все файлы в папке Views и подключаем их
            if (fs.existsSync(viewDirPath)) {
              const viewFiles = fs.readdirSync(viewDirPath);
              for (const file of viewFiles) {
                const viewFilePath = path.join(viewDirPath, file);
                if (path.extname(file) === '.js') {
                  const viewRoutes = require(viewFilePath);
                  if (file.toLowerCase().includes('admin')) {
                    app.use(`/admin${routePrefix}`, enabledMiddleware, viewRoutes);
                  } else {
                    app.use(`${routePrefix}`, enabledMiddleware, viewRoutes);
                  }
                }
              }
            }
            
            const initPath = path.join(modulePath, 'init.js');
            if (fs.existsSync(initPath)) {
                try {
                    const init = require(initPath);
                    if (typeof init === 'function') {
                        await init(); // Запускаем инициализацию
                        log.info(`initPath executed for module [${module.moduleName}]`);
                    }
                } catch (err) {
                    console.error(`Error executing initPath for module ${module.moduleName}:`, err);
                }
            }

            // Добавляем папку представлений модуля
            viewsPaths.push(moduleViewsPath);
        } catch (err) {
            console.error(`Error loading module ${module.moduleName}:`, err);
        }
      }

      app.set('views', viewsPaths);
    }
  }

let moduleManager = new ModuleManager(app);

module.exports = { moduleManager };