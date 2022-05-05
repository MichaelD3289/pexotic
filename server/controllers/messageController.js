const sequelize = require("../sequelize");

module.exports = {
  createRoom: async (data) => {
    const splitData = data.split(".");

    return sequelize
      .query(
        `
      INSERT INTO conversation (room_name, user_id, seller_id, modified_at)
      VALUES ('${data.replace('\'', '"')}', (
        SELECT user_id FROM users WHERE username = '${splitData[2]}'
      ), (
        SELECT user_id FROM sellers WHERE seller_id = '${splitData[0]}'
      ), NOW())
      ON CONFLICT (user_id, seller_id) DO
      UPDATE SET room_name = '${data.replace('\'', '"')}', modified_at = NOW()
      RETURNING room_name;
      `
      )
      .then((dbRes) => {
        return dbRes[0][0]?.room_name.replace('"', '\'');
      })
      .catch((err) => err);
  },
  getAllRooms: async (data) => {
    return sequelize
      .query(
      `
      SELECT room_name 
      FROM conversation
      WHERE user_id = (
      SELECT user_id 
      FROM users 
      WHERE username = '${data.data}'
      )
      ORDER BY modified_at DESC;
      `
      )
      .then((dbRes) => {
        return dbRes[0].map((item) => item.room_name.replace('"', '\''));
      })
      .catch((err) => err);
  },
  getMessages: async (data) => {
    return sequelize
      .query(
      `
      SELECT
      m.message_seen,
      m.message_text,
      m.created_at,
      u.username
      FROM message AS m
      JOIN conversation AS c
      ON c.conversation_id = m.conversation_id
      JOIN users AS u
      ON u.user_id = m.sent_by
      AND c.user_id = u.user_id
      WHERE room_name = '${data?.room?.replace('\'', '"')}'
      ORDER BY created_at ASC;
      `
      )
      .then((dbRes) => {
        return dbRes[0];
      })
      .catch((err) => err);
  },
  sendMessage: async (data) => {
    
    return sequelize
      .query(
      `
      INSERT INTO message (conversation_id, sent_by, modified_at, message_text, message_seen)
      VALUES ((
        SELECT conversation_id FROM conversation
        WHERE room_name = '${data.room.replace('\'', '"')}'
      ), (
        SELECT user_id FROM users
        WHERE username = '${data.sender}'
      ), NOW(), '${data.message}', FALSE)
      RETURNING *;

      UPDATE conversation
      SET modified_at = NOW()
      WHERE room_name = '${data.room.replace('\'', '"')}';
      `
      )
      .then((dbRes) => {
        return dbRes[0][0];
      })
      .catch((err) => err);
  }
}