const express = require('express')
const bodyParser = require('body-parser');
const mainRouter = require('./routs/mainRouts')
const userRouter = require('./routs/userRouts')
const {port} = require('./settings');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}))

app.use('/', mainRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})