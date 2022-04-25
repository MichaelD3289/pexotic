const sequelize = require('../sequelize');

module.exports = {
    getListing: function (req, res) {
        sequelize
          .query(`
          SELECT listing_id, listing_name, description, price, qty_in_stock, sku, shipping_price, current_discount, main_photo, category_id, l.seller_id, species_id, number_sold, photo_two, photo_three, photo_four, photo_five, img_url AS shopLogo, company_name AS shopName
          
          FROM listings as l
          JOIN sellers as s
          ON l.seller_id = s.seller_id
          
          WHERE listing_id = ${req.params.id}
          ;          
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err));
    },
    getPopularListings: (req, res) => {
        const { limit } = req.query;

        sequelize
          .query(`
          SELECT *
          
          FROM listings
          
          ORDER BY number_sold DESC
          LIMIT ${limit}
          ;          
          `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err));
    },
    fetchViewed: (req, res) => {
      console.log(req.user)
        const { limit } = req.query;
        const { user_id } = req.user;
      // console.log('user_id', user_id);

      sequelize
        .query(`
        SELECT 
        v.listing_id, 
        l.listing_name,
        l.main_photo,
        l.price,
        l.qty_in_stock as qty
        
        FROM viewed_listings AS v
        JOIN listings AS l
        ON l.listing_id = v.listing_id
        WHERE user_id = '${user_id}'
        ORDER BY v.modified_at DESC
        LIMIT ${limit};
        `)
        .then(dbRes => {
          console.log(dbRes)
          res.status(200).send(dbRes[0])
        })
        .catch(err => {
          console.log(err)
          res.status(500).send(err)
        })
    },
    addViewed: (req, res) => {
      console.log(req.body)
      const { listingId } = req.body;
      const { user_id } = req.user;
      
      sequelize
        .query(`
        INSERT INTO viewed_listings (user_id, listing_id, modified_at)
        VALUES ('${user_id}', ${listingId}, NOW())
        ON CONFLICT (user_id, listing_id) DO UPDATE SET modified_at = NOW();
        
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });

    }
}