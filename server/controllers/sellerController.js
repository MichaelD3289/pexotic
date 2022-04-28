const sequelize = require('../sequelize');
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
  becomeSeller: (req, res) => {
    let { companyName } = req.body;
    const { user_id } = req.user;

    const companyName_esc = sequelize.escape(companyName);

    sequelize
      .query(`
        INSERT INTO sellers (user_id, company_name)
        VALUES ('${user_id}', ${companyName_esc});

        UPDATE users 
        SET isvendor = true 
        WHERE user_id = '${user_id}';

        UPDATE users 
        SET modified_at = NOW() 
        WHERE user_id = '${user_id}';

        SELECT * FROM users WHERE user_id = '${user_id}';
      `)
      .then((dbRes) => {
       
        const {username, isvendor} = dbRes[0][0];
              
        const token = jwt.sign(
          {
            user_id: dbRes[0][0].user_id,
            username: username,
            email: dbRes[0][0].email,
            first_name: dbRes[0][0].first_name,
            last_name: dbRes[0][0].last_name,
            phone: dbRes[0][0].phone,
            address_line_one: dbRes[0][0].address_line_one,
            address_line_two: dbRes[0][0].address_line_two,
            city: dbRes[0][0].city,
            state: dbRes[0][0].state,
            zipcode: dbRes[0][0].zipcode,
            isVendor: isvendor,
          },
          process.env.JWT_SECRET
        );
        res.status(200).send({ 
            token, 
            user: {
              username,
              isvendor
            }
          });
      })
      .catch((err) => res.status(500).send(err));
  }
}