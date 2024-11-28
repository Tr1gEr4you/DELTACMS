const express = require('express')
const bodyParser = require('body-parser');
const {port} = require('./settings');
const {mainRouter} = require('./routes/main-router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})