var express = require('express');
var router = express.Router();
const repository = require('../db/repository');
const countries = new repository('country');
const cities = new repository('city');
const countryLanguages = new repository('countrylanguage');

const limit = 25;
router.get('/cities', async function (req, res, next) {
    let page = req.query.page - 1 || 0;
    let pages = Math.ceil(await cities.countAll() / limit);
    let paginationInfo = {
        offset: page * limit,
        limit
    };

res.render('cities/cities', {
    citties: await cities.readAllByCriteria({
        ...paginationInfo,
        raw: true,
        order: [['Name', 'ASC']],
    }),
    paginationInfo,
    page,
    pages
});
});

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