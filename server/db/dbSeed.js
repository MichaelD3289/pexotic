const sequelize = require('../sequelize');

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(`
      -- deleting all tables prior to creation if they exist

      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS cart CASCADE;
      DROP TABLE IF EXISTS sellers CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS category CASCADE;
      DROP TABLE IF EXISTS species CASCADE;
      DROP TABLE IF EXISTS listings CASCADE;
      DROP TABLE IF EXISTS discounts CASCADE;
      DROP TABLE IF EXISTS conversation CASCADE;
      DROP TABLE IF EXISTS message CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS discounts_listings CASCADE;
      DROP TABLE IF EXISTS favorite_items CASCADE;
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS cart_item CASCADE;
      DROP TABLE IF EXISTS viewed_listings CASCADE;
      DROP TABLE IF EXISTS show_views CASCADE;

      -- creating all db tables
      
      CREATE TABLE users(
      user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(35) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(80) NOT NULL UNIQUE,
      password_hash VARCHAR(500) NOT NULL,
      phone VARCHAR(15) NULL,
      address_line_one VARCHAR(100) NULL,
      address_line_two VARCHAR(100) NULL,
      city VARCHAR(30) NOT NULL,
      state VARCHAR(30) NOT NULL,
      zipcode VARCHAR(5) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL,
      profile_img VARCHAR(150) NULL,
      profile_img_key VARCHAR(100) NULL,
      isVendor BOOLEAN NOT NULL DEFAULT FALSE
      );
      
      CREATE TABLE cart(
      cart_id SERIAL PRIMARY KEY,
      user_id UUID UNIQUE NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE wishlist(
      wishlist_id SERIAL PRIMARY KEY,
      wishlist_name VARCHAR(30) NOT NULL,
      user_id UUID NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE sellers(
      seller_id SERIAL PRIMARY KEY,
      company_name VARCHAR(50) NOT NULL,
      img_url VARCHAR(150) NOT NULL DEFAULT '/static/logo-placeholder.jpg',
      cover_img_url VARCHAR(150) NOT NULL DEFAULT '/static/cover-img-placeholder.jpg',
      img_url_key VARCHAR(100) NULL,
      cover_img_url_key VARCHAR(100) NULL,
      user_id UUID NOT NULL REFERENCES users(user_id)
      );

      CREATE TABLE shop_views(
      shop_view_id SERIAL PRIMARY KEY,
      seller_id INTEGER NOT NULL REFERENCES sellers(seller_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      CREATE TABLE orders(
      order_id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      CREATE TABLE category(
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(50) NOT NULL,
      image_url VARCHAR(150) NOT NULL,
      image_alt VARCHAR(50) NOT NULL, 
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE species(
      species_id SERIAL PRIMARY KEY,
      common_name VARCHAR(60) NOT NULL,
      native_area VARCHAR(60) NOT NULL,
      genus VARCHAR(75) NOT NULL,
      species VARCHAR(75) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE listings(
      listing_id SERIAL PRIMARY KEY,
      listing_name VARCHAR(50) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      price FLOAT NOT NULL,
      qty_in_stock INT NOT NULL,
      sku VARCHAR(100) NULL,
      shipping_price FLOAT NOT NULL,
      current_discount BOOLEAN NOT NULL DEFAULT FALSE,
      main_photo VARCHAR(150) NULL,
      photo_two VARCHAR(150) NULL,
      photo_three VARCHAR(150) NULL,
      photo_four VARCHAR(150) NULL,
      photo_five VARCHAR(150) NULL,
      category_id INT NOT NULL REFERENCES category(category_id),
      seller_id INT NOT NULL REFERENCES sellers(seller_id),
      species_id INT NOT NULL REFERENCES species(species_id),
      number_sold INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL,
      main_photo_key VARCHAR(100) NULL,
      photo_two_key VARCHAR(100) NULL,
      photo_three_key VARCHAR(100) NULL,
      photo_four_key VARCHAR(100) NULL,
      photo_five_key VARCHAR(100) NULL
      );
      
      CREATE TABLE discounts(
      discount_id SERIAL PRIMARY KEY,
      discount_name VARCHAR(60) NOT NULL,
      discount_type VARCHAR(30) NOT NULL,
      amount_off INT NOT NULL,
      seller_id UUID NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE conversation(
      conversation_id SERIAL PRIMARY KEY,
      room_name VARCHAR(250) NOT NULL,
      user_id UUID NOT NULL REFERENCES users(user_id),
      seller_id UUID NOT NULL REFERENCES users(user_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL,
      UNIQUE(user_id, seller_id)
      );
      
      CREATE TABLE message(
      message_id SERIAL PRIMARY KEY,
      sent_by UUID NOT NULL REFERENCES users(user_id),
      received_by UUID NOT NULL REFERENCES users(user_id),
      conversation_id INT NOT NULL REFERENCES conversation(conversation_id),
      message_seen BOOLEAN NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE reviews(
      review_id SERIAL PRIMARY KEY,
      rating INT NOT NULL,
      user_id UUID NOT NULL REFERENCES users(user_id),
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      text_content VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      
      CREATE TABLE discounts_listings(
      discounts_listings_id SERIAL PRIMARY KEY,
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      discount_id INT NOT NULL REFERENCES discounts(discount_id)
      );
      
      CREATE TABLE favorite_items(
      favorite_items_id SERIAL PRIMARY KEY,
      is_favorite BOOLEAN NOT NULL DEFAULT TRUE,
      user_id UUID NOT NULL REFERENCES users(user_id),
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE order_items(
      order_items_id SERIAL PRIMARY KEY,
      qty INT NOT NULL,
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      order_id INT NOT NULL REFERENCES orders(order_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE cart_item(
      cart_item_id SERIAL PRIMARY KEY,
      cart_id INT NOT NULL REFERENCES cart(cart_id),
      qty INT NOT NULL,
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL
      );

      CREATE TABLE viewed_listings(
      viewed_listings_id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(user_id),
      listing_id INT NOT NULL REFERENCES listings(listing_id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      modified_at TIMESTAMP NOT NULL,
      UNIQUE (user_id, listing_id)
      );

      CREATE TABLE search_terms(
      search_terms_id SERIAL PRIMARY KEY,
      search_term VARCHAR(150) UNIQUE NOT NULL,
      times_searched INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      MODIFIED_AT TIMESTAMP NOT NULL
      );
      
      INSERT INTO category(category_name, image_url, image_alt, modified_at)
      VALUES
      ('Tarantulas', 'tarantula.jpg', 'Rose hair tarantula in outstretched palms', NOW()),
      ('Reptiles', 'chameleon.jpg', 'Green Chameleon on Branch', NOW()),
      ('Birds', 'macaw.jpg', 'Two Hyacinth Macaws', NOW()),
      ('Fish', 'betta.jpg', 'Blue and Orange Betta against black backdrop', NOW()),
      ('Feeder', 'mealworms.jpg', 'pile of mealworms', NOW())
      ;
      
      `)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err));
  }
}