const sequelize = require('../sequelize');

module.exports = {
  getCart: (req, res) => {

    const {user_id} = req.user;

    sequelize.query(`
    SELECT 
    ci.cart_item_id,
    ci.qty,
    ci.listing_id,
    li.listing_name,
    li.price,
    li.shipping_price,
    li.current_discount,
    li.main_photo,
    li.seller_id
    FROM cart_item AS ci
    JOIN listings AS li
    ON ci.listing_id = li.listing_id
    WHERE cart_id IN(
    SELECT cart_id
    FROM cart
    WHERE user_id = '${user_id}'
  ) ORDER BY cart_item_id DESC;
    `)
      .then(cart => {
        res.status(200).send(cart[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  addToCart: (req, res) => {
    const { listing_id, qty } = req.body;
    const {user_id} = req.user;

    const qtyEsc = sequelize.escape(qty);
    const listing_idEsc = sequelize.escape(listing_id); 
    
    sequelize
      .query(`

      INSERT INTO cart
      (user_id, modified_at)
      VALUES
      ('${user_id}', NOW())
      ON CONFLICT (user_id) DO NOTHING;

      INSERT INTO cart_item (
        cart_id,
        listing_id,
        qty,
        modified_at
      )
      VALUES (
        (SELECT 
          cart_id 
          FROM cart
          WHERE user_id = '${user_id}'),
        ${listing_idEsc},
        ${qtyEsc},
        NOW()
      )
      RETURNING *;
        
      UPDATE cart
      SET modified_at = NOW()
      WHERE user_id = '${user_id}';

      SELECT 
      main_photo,
      listing_name,
      seller_id,
      shipping_price,
      current_discount,
      price
      FROM listings
      WHERE listing_id = ${listing_idEsc};

      `)
      .then(cart => {
        const [cartItem, listing] = cart[0];

        res.status(200).send({cartItem, listing});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })

    
  },
  removeFromCart: (req, res) => {

    sequelize
      .query(`
      DELETE FROM cart_item
      WHERE cart_item_id = ${req.params.cartItemId}
      RETURNING *;

      UPDATE cart
      SET modified_at = NOW()
      WHERE user_id = '${req.user.user_id}';
      `)
      .then(cart => {
        res.status(200).send(cart[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })

  },
  updateCart: (req, res) => {
    sequelize 
      .query(`
      UPDATE cart_item
      SET qty = ${req.body.qty}
      WHERE cart_item_id = ${req.params.cartItemId}
      RETURNING *;
      
      UPDATE cart_item
      SET modified_at = NOW()
      WHERE cart_item_id = ${req.params.cartItemId};

      UPDATE cart
      SET modified_at = NOW()
      WHERE cart_id = (SELECT cart_id FROM cart_item WHERE cart_item_id = ${req.params.cartItemId});
      `)
      .then(cart => {
        res.status(200).send(cart[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
  },
  clearCart: (req, res) => {
    sequelize
      .query(`
      DELETE FROM cart_item
      WHERE cart_id = (SELECT cart_id FROM cart WHERE user_id = '${req.user.user_id}');

      UPDATE cart
      SET modified_at = NOW()
      WHERE user_id = '${req.user.user_id}';
      `)
      .then(cart => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
  }
}