const sequelize = require('../sequelize');

module.exports = {
    getListing: function (req, res) {
        sequelize
          .query(`
          SELECT * FROM listings WHERE listing_id = ${req.params.id}
          ;          
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err));
    },
}