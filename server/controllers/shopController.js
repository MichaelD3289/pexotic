const sequelize = require('../sequelize');

module.exports = {
  fetchViewShops: (req, res) => {
      const { limit } = req.query;
    sequelize
      .query(`
      SELECT 
      s.seller_id, 
      company_name, 
      img_url,
      SUM(number_sold) AS total_sold
      FROM sellers AS s
      JOIN listings AS l
      ON l.seller_id = s.seller_id
      GROUP BY s.seller_id
      ORDER BY total_sold DESC
      LIMIT ${limit};
      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => {
        
        res.status(500).send(err)
      });
  },
  fetchShop: (req, res) => {
    
    const {shopId} = req.params;
    
    sequelize
      .query(`
        SELECT
        s.seller_id, 
        s.company_name,
        s.img_url,
        s.cover_img_url,
        u.city,
        u.state

        FROM sellers AS s
        JOIN users AS u
        ON u.user_id = s.user_id
        where s.seller_id = ${shopId};

        SELECT
        l.listing_id,
        l.price,
        l.qty_in_stock qty,
        l.listing_name,
        l.main_photo,
        l.number_sold,
        c.category_name
        FROM listings AS l
        JOIN category AS c
        ON c.category_id = l.category_id
        WHERE seller_id = ${shopId};


      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      });
  }
}