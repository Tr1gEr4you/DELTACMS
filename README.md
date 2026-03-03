# DELTACMS
Game content management system

```
DeltaEngine
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ core
   │  ├─ app.js
   │  ├─ config
   │  │  ├─ controller.js
   │  │  ├─ database.js
   │  │  ├─ router.js
   │  │  └─ settings.js
   │  ├─ controllers
   │  │  ├─ adminController.js
   │  │  ├─ GlobalSettingsController.js
   │  │  └─ moduleController.js
   │  ├─ database
   │  │  └─ initDatabse.js
   │  ├─ middlewares
   │  │  ├─ auth.js
   │  │  ├─ checkRoles.js
   │  │  ├─ headerButton.js
   │  │  └─ settingsLoader.js
   │  ├─ models
   │  │  └─ module.js
   │  ├─ moduleLoader.js
   │  ├─ routes
   │  │  ├─ api
   │  │  │  └─ moduleApiRoutes.js
   │  │  └─ views
   │  │     ├─ adminRoutes.js
   │  │     ├─ moduleAdminRouts.js
   │  │     └─ settingsAdminRouts.js
   │  ├─ server.js
   │  ├─ server.log
   │  ├─ services
   │  │  └─ GlobalSettingsService.js
   │  └─ utils
   │     └─ logger.js
   ├─ modules
   │  ├─ auth
   │  │  ├─ controllers
   │  │  │  └─ authController.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     └─ authRoutes.js
   │  │  └─ services
   │  │     └─ authService.js
   │  ├─ header
   │  │  ├─ controllers
   │  │  │  ├─ headerAdminController.js
   │  │  │  └─ headerApiController.js
   │  │  ├─ models
   │  │  │  └─ headerModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  ├─ api
   │  │  │  │  └─ headerApiRoutes.js
   │  │  │  └─ views
   │  │  │     └─ headerAdminRoutes.js
   │  │  └─ services
   │  │     └─ headerService.js
   │  ├─ page
   │  │  ├─ controllers
   │  │  │  ├─ pageAdminController.js
   │  │  │  ├─ pageApiController.js
   │  │  │  └─ pageController.js
   │  │  ├─ models
   │  │  │  └─ pageModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  ├─ api
   │  │  │  │  └─ pageApiRoutes.js
   │  │  │  └─ views
   │  │  │     ├─ pageAdminRoutes.js
   │  │  │     └─ pageRotes.js
   │  │  └─ services
   │  │     └─ pageService.js
   │  ├─ rcon
   │  │  ├─ controllers
   │  │  │  └─ rconAdminController.js
   │  │  ├─ models
   │  │  │  └─ rconModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     └─ rconAdminRoutes.js
   │  │  └─ services
   │  │     └─ rconService.js
   │  ├─ roles
   │  │  ├─ controllers
   │  │  │  ├─ roleAdminController.js
   │  │  │  └─ roleApiController.js
   │  │  ├─ models
   │  │  │  └─ roleModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  ├─ api
   │  │  │  │  └─ roleApiRoutes.js
   │  │  │  └─ views
   │  │  │     └─ roleAdminRoutes.js
   │  │  └─ services
   │  │     └─ roleService.js
   │  ├─ servers
   │  │  ├─ controllers
   │  │  │  └─ serverAdminController.js
   │  │  ├─ models
   │  │  │  └─ serverModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     └─ serverAdminRoutes.js
   │  │  └─ services
   │  │     └─ serverService.js
   │  ├─ server_status
   │  │  ├─ controllers
   │  │  │  └─ serverStatusController.js
   │  │  ├─ init.js
   │  │  ├─ models
   │  │  │  └─ serverStatusModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     └─ serverStatusRoutes.js
   │  │  └─ services
   │  │     └─ serverStatusService.js
   │  ├─ shopcs2
   │  │  ├─ controllers
   │  │  │  ├─ shopAdminController.js
   │  │  │  └─ shopController.js
   │  │  ├─ models
   │  │  │  ├─ shopDatabase.js
   │  │  │  └─ shopModel.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     ├─ shopAdminRoutes.js
   │  │  │     └─ shopRoutes.js
   │  │  └─ services
   │  │     └─ shopService.js
   │  ├─ statistics
   │  │  ├─ controllers
   │  │  │  └─ statisticsAdminController.js
   │  │  ├─ models
   │  │  │  └─ statisticsModels.js
   │  │  ├─ module.json
   │  │  ├─ routes
   │  │  │  └─ views
   │  │  │     └─ statisticsAdminRoutes.js
   │  │  └─ services
   │  │     └─ statisticsService.js
   │  └─ users
   │     ├─ controllers
   │     │  ├─ userAdminController.js
   │     │  ├─ userApiController.js
   │     │  └─ userPageController.js
   │     ├─ models
   │     │  └─ userModel.js
   │     ├─ module.json
   │     ├─ routes
   │     │  ├─ api
   │     │  │  └─ userApiRoutes.js
   │     │  └─ views
   │     │     ├─ userAdminRoutes.js
   │     │     └─ userPageRoutes.js
   │     └─ services
   │        └─ userService.js
   ├─ public
   │  ├─ css
   │  │  ├─ admin-styles.css
   │  │  └─ images
   │  │     ├─ abstract.jpg
   │  │     ├─ awp_lego_2.jpg
   │  │     ├─ backrooms.jpg
   │  │     ├─ cs_office.jpg
   │  │     ├─ de_dust2.jpg
   │  │     ├─ de_mirage.jpg
   │  │     └─ ze_sky_fantasy_v2.jpg
   │  ├─ lounge
   │  │  ├─ css
   │  │  │  └─ style.css
   │  │  └─ images
   │  └─ lounge1
   │     ├─ css
   │     │  └─ style.css
   │     └─ images
   │        ├─ awp_lego_2.jpg
   │        ├─ background-card.jpg
   │        ├─ de_anubis.png
   │        └─ logo.svg
   ├─ uploads
   │  └─ modules
   └─ views
      ├─ admin
      │  ├─ auth
      │  │  └─ auth.ejs
      │  ├─ dashboard.ejs
      │  ├─ disabled.ejs
      │  ├─ header
      │  │  ├─ add.ejs
      │  │  ├─ edit.ejs
      │  │  └─ list.ejs
      │  ├─ modules.ejs
      │  ├─ pages
      │  │  ├─ add.ejs
      │  │  ├─ edit.ejs
      │  │  └─ list.ejs
      │  ├─ partials
      │  │  ├─ footer-admin.ejs
      │  │  ├─ head-admin.ejs
      │  │  └─ sidebar-admin.ejs
      │  ├─ rcon
      │  │  └─ rcon.ejs
      │  ├─ roles
      │  │  ├─ add.ejs
      │  │  ├─ edit.ejs
      │  │  └─ list.ejs
      │  ├─ servers
      │  │  ├─ add.ejs
      │  │  ├─ edit.ejs
      │  │  └─ list.ejs
      │  ├─ settings.ejs
      │  ├─ shopcs2
      │  │  └─ index.ejs
      │  ├─ statistics
      │  │  └─ index.ejs
      │  └─ users
      │     ├─ add.ejs
      │     ├─ edit.ejs
      │     └─ list.ejs
      └─ theme
         └─ lounge
            ├─ auth
            │  ├─ login.ejs
            │  └─ register.ejs
            ├─ monitoring
            │  └─ index.ejs
            ├─ pages
            │  └─ page.ejs
            ├─ partials
            │  ├─ footer.ejs
            │  └─ head.ejs
            ├─ stats
            │  └─ cs2
            │     └─ index.ejs
            └─ users
               ├─ profile.ejs
               └─ settings.ejs

```
