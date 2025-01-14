//Библиотеки
const express = require('express')
const bodyParser = require('body-parser');
const mainRouter = require('./config/router')
const mysql = require('mysql2')
const db = require('./config/database')
const {port} = require('./config/settings')
const { GameDig } = require('gamedig');

//Роуты
const adminUserRouter = require('../modules/user/routs/adminUserRouts')
const adminRouter = require('../modules/admin/routs/adminRouts')
const adminServerRouter = require('../modules/monitoring/routs/adminServerRouts')
const adminBlogRouter = require('../modules/blog/routs/adminBlogRouts')
const blogRouter = require('../modules/blog/routs/blogRouts')
const monitoringRouts = require('../modules/monitoring/routs/serverRouts')

const app = express();

//Настройки ядра
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))
app.use(express.static('../public'))
app.use('', mainRouter);

//Админ роуты
app.use('/admin', adminUserRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminServerRouter);
app.use('/admin', adminBlogRouter)

//Юзер роуты
app.use('/', blogRouter)
app.use('/', monitoringRouts)

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})
