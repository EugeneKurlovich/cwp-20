var express = require('express');
var path = require('path');


var index = require('./routes/index');
let countries = require('./routes/countries');
let cities = require('./routes/cities');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', countries);
app.use('/', cities);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
