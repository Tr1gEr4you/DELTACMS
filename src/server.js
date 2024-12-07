const express = require('express')
const bodyParser = require('body-parser');
const mainRouter = require('./routs/mainRouts')
const userRouter = require('./routs/userRouts')
const adminRouter = require('./routs/adminRouts')
const mysql = require('mysql2')
const db = require('./database')
const {port} = require('./settings')

const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/public'))

app.use('/home', mainRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

/*app.use(function (req, res) {
    res.status(404).render('error');
})*/

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})