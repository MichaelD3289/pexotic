const sequelize = require('../sequelize');

module.exports = {
  setUserImage: async (userId, imgKey, imgLocation) => {
    const result = await sequelize.query(`
      UPDATE users
      SET profile_img_key = '${imgKey}'
      WHERE user_id = '${userId}';  
    
      UPDATE users
      SET profile_img = '${imgLocation}'
      WHERE user_id = '${userId}'
      RETURNING profile_img;
    `)
    return result[0][0].profile_img;
  },
  getPriorUserImageKey: async (userId) => {
    const result = await sequelize.query(`
      SELECT profile_img_key
      FROM users
      WHERE user_id = '${userId}';
    `)
    return result[0][0].profile_img_key;
  },
  setLogoImage: async (userId, imgKey, imgLocation) => {
    const result = await sequelize.query(`
      UPDATE sellers
      SET img_url_key = '${imgKey}'
      WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}');  
    
      UPDATE sellers
      SET img_url = '${imgLocation}'
      WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}')
      RETURNING img_url;
    `)
    return result[0][0].img_url;
  },
  getPriorLogoImageKey: async (userId) => {
    const result = await sequelize.query(`
      SELECT img_url_key
      FROM sellers
      WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}');
    `)
    return result[0][0].img_url_key;
  },
  setCoverImage: async (userId, imgKey, imgLocation) => {
    const result = await sequelize.query(`
    UPDATE sellers
    SET cover_img_url_key = '${imgKey}'
    WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}');  
  
    UPDATE sellers
    SET cover_img_url = '${imgLocation}'
    WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}')
    RETURNING img_url;
    `)
    return result[0][0].img_url;
  },
  getPriorCoverImageKey: async (userId) => {
    const result = await sequelize.query(`
    SELECT cover_img_url_key
    FROM sellers
    WHERE seller_id = (SELECT seller_id FROM sellers WHERE user_id = '${userId}');
    `)
    return result[0][0].cover_img_url_key;
  }
}