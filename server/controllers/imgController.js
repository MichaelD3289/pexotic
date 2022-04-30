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
  }
}