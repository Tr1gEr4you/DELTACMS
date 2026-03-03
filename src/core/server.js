const app = require('./app')

const { moduleManager } = require('./moduleLoader');
const { initializeDatabase } = require('./database/initDatabse')
const { port } = require('./config/settings')
const { log } = require('./utils/logger')

async function startServer() {
    await initializeDatabase();

    await moduleManager.findModules();
    await moduleManager.loadModules(app);

    app.listen(port, () => {
        log.info(`Server listen ${port}`)
        console.log(`Админ панель: http://localhost:3005/admin/dashboard`)
    })
    console.log('Views path:', app.get('views'));
}

startServer();


