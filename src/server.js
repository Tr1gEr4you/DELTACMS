const express = require('express')
const bodyParser = require('body-parser');
const mainRouter = require('./routs/mainRouts')
const userRouter = require('./routs/adminUserRouts')
const adminRouter = require('./routs/adminRouts')
const adminServerRouter = require('./routs/adminServerRouts')
const adminBlogRouter = require('./routs/adminBlogRouts')
const mysql = require('mysql2')
const db = require('./database')
const {port} = require('./settings')
const { GameDig } = require('gamedig');

const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/public'))

app.use('', mainRouter);
app.use('/admin', userRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminServerRouter);
app.use('/admin', adminBlogRouter)

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})
