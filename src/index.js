const path = require('path');
const express = require('express');
var morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 8888;
const route = require('./routes');
const db = require('./config/db');
const busboy = require('connect-busboy');

//connect to db
db.connect();

//HTTP Logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

//urlencoded + json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine
app.engine('.hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: require('./config/hbs_helper/helper'),
}));

// request File parsing 
app.use(busboy())
route(app);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});