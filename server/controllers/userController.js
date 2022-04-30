const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      city,
      state,
      zipcode,
    } = req.body;

    // function to validate password with regex
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return regex.test(password);
    };
    if (!validatePassword(password)) {
      return res.status(400).send({
        message: "Password must contain at least 8 characters, 1 number, 1 special character and 1 letter",
      });
    }
    // escape all inputs
    const first_name_esc = sequelize.escape(firstName);
    const last_name_esc = sequelize.escape(lastName);
    const username_esc = sequelize.escape(username);
    const email_esc = sequelize.escape(email);
    const city_esc = sequelize.escape(city);
    const state_esc = sequelize.escape(state);
    const zipcode_esc = sequelize.escape(zipcode);

    // hash password
    (async () => {
      const hashedPassword = await bcrypt.hash(password, 10);
      // create user
      sequelize
        .query(
          `
      INSERT INTO users (first_name, last_name, username, email, password_hash, city, state, zipcode, modified_at)
      VALUES (${first_name_esc}, ${last_name_esc}, ${username_esc}, ${email_esc}, '${hashedPassword}', ${city_esc}, ${state_esc}, ${zipcode_esc}, NOW());
      `
        )
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => res.send({message: err.errors[0].message}));
    })();
  },
  loginUser: (req, res) => {
    const { username, password } = req.body;
    // escape all inputs
    const username_esc = sequelize.escape(username);
    // check if user exists
    sequelize
      .query(
        `
      SELECT * FROM users WHERE username = ${username_esc};
      `
      )
      .then((dbRes) => {
        if (dbRes[0].length === 0) {
          res.sendStatus(404);
        } else {
          // check if password is correct
          bcrypt.compare(password, dbRes[0][0].password_hash, (err, result) => {
            if (err) {
              res.sendStatus(500);
            } else if (result) {
              // create token
              const {username, isvendor, profile_img} = dbRes[0][0];
              console.log(profile_img)
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
                  profilePic: profile_img,
                },
                process.env.JWT_SECRET
              );
              res.status(200).send({ token, username, isvendor, profilePic: profile_img });
            } else {
              res.sendStatus(401);
            }
          });
        }
      })
      .catch((err) => res.send(err));
  },
  getAllFavorites: (req, res) => {
    const { user_id } = req.user;
    
    sequelize
      .query(
        `
      SELECT
       f.listing_id,
       l.listing_name,
       l.price,
       l.qty_in_stock AS qty,
       l.main_photo 
      FROM favorite_items AS f
      JOIN listings AS l 
      ON f.listing_id = l.listing_id
      WHERE 
      user_id = '${user_id}';
      `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => res.send(err));
  },
  addFavorite: (req, res) => {
    const { user_id } = req.user;
    const { listing_id } = req.body;
    sequelize
      .query(
        `
      INSERT INTO favorite_items (user_id, listing_id, modified_at)
      VALUES ('${user_id}', '${listing_id}', NOW());
      `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => res.send(err));
  },
  removeFavorite: (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    sequelize
      .query(
        `
      DELETE FROM favorite_items WHERE user_id = '${user_id}' AND listing_id = '${id}';
      `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => res.send(err));
  },
  getProfilePic: (req, res) => {
    const { user_id } = req.user;
    sequelize
      .query(
        `
      SELECT profile_img FROM users WHERE user_id = '${user_id}';
      `
      )
      .then((dbRes) => {
        console.log(dbRes[0])
        res.status(200).send(dbRes[0][0])
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
