const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');

//Middlewares
const { checkRole } = require('./middlewares/checkRoles')
const { loadButtons } = require('./middlewares/headerButton')
const { settingsLoader } = require('./middlewares/settingsLoader')

//Роуты 
const adminRouter = require('./routes/views/adminRoutes')
const settingAdminRoutes = require('./routes/views/settingsAdminRouts')

const moduleAdminRouter = require('./routes/views/moduleAdminRouts')
//Api
const moduleApiRouter = require('./routes/api/moduleApiRoutes')

const app = express();

//Настройки ядра
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(loadButtons)
app.use(settingsLoader)
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('../public'))

app.use(session({
    secret: 'fgsdfg43gfsd', // Секретный ключ для подписи сессии
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // В production установите secure: true для HTTPS
  }));

  app.use((req, res, next) => {
    res.locals.userID = req.session.userID || null;
    res.locals.userLogin= req.session.userLogin || null;
    res.locals.userFlags = req.session.userFlags || null;
    res.locals.userBalance = req.session.userBalance || null;
    next();
  });

//Админ роуты
app.use('/admin', adminRouter);
app.use('/admin/modules', moduleAdminRouter)
app.use('/api/modules', moduleApiRouter)
app.use('/admin', settingAdminRoutes)

//app.use('', mainRouter);
//app.use('/api', userRouter);
//app.use('/admin/users', userAdminRouter)



module.exports = app