const sequelize = require('../sequelize');

module.exports = {
  fetchCategories: (req, res) => {  // get all categories
    sequelize
      .query(`
      SELECT * FROM category;
      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err));
  },

}