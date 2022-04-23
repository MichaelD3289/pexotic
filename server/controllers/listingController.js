const sequelize = require('../sequelize');

module.exports = {
    getListing: function (req, res) {
        sequelize
          .query(`
          SELECT listing_id, listing_name, description, price, qty_in_stock, sku, shipping_price, current_discount, main_photo, subcategory_id, l.seller_id, species_id, number_sold, photo_two, photo_three, photo_four, photo_five, img_url AS shopLogo, company_name AS shopName
          
          FROM listings as l
          JOIN sellers as s
          ON l.seller_id = s.seller_id
          
          WHERE listing_id = ${req.params.id}
          ;          
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err));
    },
}