var express = require('express');
var router = express.Router();
const repository = require('../db/repository');
const countries = new repository('country');
const countryLanguages = new repository('countrylanguage');
const cities = new repository('city');

router.get('/', async function (req, res, next) {
    res.render('index', {
        countriesCount: await countries.countAll(),
        citiesCount: await cities.countAll()});
});

module.exports = router;
