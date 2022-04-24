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
  }
}