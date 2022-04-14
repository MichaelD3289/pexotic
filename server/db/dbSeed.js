const sequelize = require('../sequelize');

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(`
      
      
      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err));
  }
}