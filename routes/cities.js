var express = require('express');
var router = express.Router();
const repository = require('../db/repository');
const countries = new repository('country');
const cities = new repository('city');
const countryLanguages = new repository('countrylanguage');

router.get('/cities/:id', async function (req, res, next) {
    let city = await cities.readById(req.params.id);
    let country = await countries.readByCriteria({
        where: {
            Code: city.CountryCode
        },
        include: [{ all: true }],
        raw: true
    });
    let officialLanguages = await countryLanguages.readAllByCriteria({
        where: {
            CountryCode: country.Code,
            IsOfficial: 'T'
        },
        raw: true
    });
    res.render('cities/city', {
        city,
        country,
        officialLanguages
    });
});

module.exports = router;