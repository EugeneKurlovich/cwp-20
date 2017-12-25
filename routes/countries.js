var express = require('express');
var router = express.Router();
const repository = require('../db/repository');
const countries = new repository('country');
const cities = new repository('city');
const countryLanguages = new repository('countrylanguage');

const limit = 25;

router.get('/countries', async function (req, res, next) {
    let page = req.query.page - 1 || 0;
    let pages = Math.ceil(await countries.countAll() / limit);
    let paginationInfo = {
        offset: page * limit,
        limit
    };
    res.render('countries/countries', {
        countries: await countries.readAllByCriteria({
            ...paginationInfo,
            raw: true
        }),
        paginationInfo,
        page,
        pages
    });
});

router.get('/countries/:code', async function (req, res, next) {
    let country = await countries.readByCriteria({
        where: {
            Code: req.params.code
        },
        include: [{ all: true }],
        raw: true
    });
    let biggestCities = await cities.readAllByCriteria({
        limit: 3,
        where: {CountryCode: country.Code},
        order: [['Population', 'DESC']],
        raw: true
    });
    let languages = await countryLanguages.readAllByCriteria({
        limit: 3,
        where: {CountryCode: country.Code},
        order: [['Percentage', 'DESC']],
        raw: true
    });
    res.render('countries/country', {
        country,
        biggestCities,
        languages
    });
});

module.exports = router;