const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const routes = require('./routes/tasks.route');
const DB = require('./db');

DB();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log(`Server in runnig on port ${app.get('port')}`);
})
