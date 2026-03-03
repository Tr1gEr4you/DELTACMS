const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');

const { checkRole } = require('./middlewares/checkRoles')
const { loadButtons } = require('./middlewares/headerButton')
const { settingsLoader } = require('./middlewares/settingsLoader')

const adminRouter = require('./routes/views/adminRoutes')
const settingAdminRoutes = require('./routes/views/settingsAdminRouts')

const moduleAdminRouter = require('./routes/views/moduleAdminRouts')

const moduleApiRouter = require('./routes/api/moduleApiRoutes')

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(loadButtons)
app.use(settingsLoader)
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('../public'))

app.use(session({
    secret: 'fgsdfg43gfsd', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));

  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

app.use('/admin', adminRouter);
app.use('/admin/modules', moduleAdminRouter)
app.use('/api/modules', moduleApiRouter)
app.use('/admin', settingAdminRoutes)

module.exports = app