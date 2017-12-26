const Sequelize = require('sequelize');
const models = require('./index')(Sequelize).models;

class Repository {
    constructor(name) {
        this.model = models[name];
    }

    readAll() {
        return this.model.findAll({raw: true});
    }

    readById(id) {
        return this.model.findById(id, {raw: true});
    }

    
    readByCriteria(criteria) {
        return this.model.findOne(criteria);
    }

    readAllByCriteria(criteria) {
        return this.model.findAll(criteria);
    }

    countAll() {
        return this.model.count();
    }

    update(data, id) {
        return this.model.findById(id)
            .then(findResult => {
                    if (findResult) {
                        return findResult.update(data);
                    }
                    else
                        return null;
                }
            ).catch(err => console.log(err));

    }

    create(data) {
        return this.model.create(data)
            .then(result => result)
            .catch(err => err);
    }

    delete(id) {
        return this.model.findById(id)
            .then(findResult => {
                if (findResult) {
                    return findResult.destroy();
                }
                else
                    return null;
            })
            .catch(err => err);
    }


}

module.exports = Repository;
