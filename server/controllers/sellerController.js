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
       
        const {username, isvendor, profile_img} = dbRes[0][0];
              
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
            profilePic: dbRes[0][0].profile_img,
          },
          process.env.JWT_SECRET
        );
        res.status(200).send({ 
            token, 
            user: {
              username,
              isvendor,
              profilePic: profile_img
            }
          });
      })
      .catch((err) => res.status(500).send(err));
  },
  getShopDashboardInfo: (req, res) => {
    let { user_id } = req.user;

    user_id = '7eccef45-f8e1-4ee9-aa8b-3837cbac2919'

    sequelize
      .query(`
      --shop views today
        SELECT 
        COUNT(*) AS listings_views_today
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE;

        --shop views yesterday
        SELECT 
        COUNT(*) AS listings_views_yesterday
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE - 1 AND modified_at < CURRENT_DATE;

        --shop views last seven days
        SELECT 
        COUNT(*) AS listings_views_seven
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE - 7;

        --shop views last thirty days
        SELECT 
        COUNT(*) AS listings_views_thirty
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE - 30;

        --shop views last 90 days
        SELECT 
        COUNT(*) AS listings_views_ninety
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE - 90;

                --shop views last 365 days
        SELECT 
        COUNT(*) AS listings_views_year
        FROM viewed_listings AS vl
        WHERE vl.listing_id IN (
          SELECT listing_id FROM listings WHERE seller_id = (
            SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
          )
        ) AND modified_at > CURRENT_DATE - 365;
        
       --shop views today
        SELECT COUNT(*) AS total_views_today FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE;

       --shop views yesterday
        SELECT COUNT(*) AS total_views_yesterday FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE -1 AND created_at < CURRENT_DATE;

      --shop views last seven days
        SELECT COUNT(*) AS total_views_seven FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE - 7;

        --shop views last thirty days
        SELECT COUNT(*) AS total_views_thirty FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE - 30;

        --shop views last 90 days
        SELECT COUNT(*) AS total_views_ninety FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE - 90;

        --shop views last 365 days
        SELECT COUNT(*) AS total_views_year FROM shop_views WHERE seller_id = (
          SELECT seller_id FROM sellers WHERE user_id = '${user_id}'
        ) AND created_at >= CURRENT_DATE - 365;

        -- orders today
        SELECT SUM(oi.qty) AS orders_today, SUM(oi.qty * l.price) AS revenue_today
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE;

        -- orders yesterday
        SELECT SUM(oi.qty) AS orders_yesterday, SUM(oi.qty * l.price) AS revenue_yesterday
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 1 AND oi.created_at < CURRENT_DATE;

        -- orders last seven days
        SELECT SUM(oi.qty) AS orders_yesterday, SUM(oi.qty * l.price) AS revenue_yesterday
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 7;

        -- orders last 30 days
        SELECT SUM(oi.qty) AS orders_thirty, SUM(oi.qty * l.price) AS revenue_thirty
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 30;

                -- orders last 90 days
        SELECT SUM(oi.qty) AS orders_ninety, SUM(oi.qty * l.price) AS revenue_ninety
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 90;

        -- orders last 365 days
        SELECT SUM(oi.qty) AS orders_year, SUM(oi.qty * l.price) AS revenue_year
        FROM order_items oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 365;

        -- test
        SELECT SUM(oi.qty) AS orders_test, SUM(oi.qty * l.price) AS revenue_test
        FROM cart_item oi
        JOIN listings l
        ON oi.listing_id = l.listing_id
        WHERE l.listing_id 
        IN (SELECT listing_id FROM listings 
        WHERE seller_id = (
        SELECT seller_id FROM sellers WHERE user_id= '${user_id}'))
        AND oi.created_at >= CURRENT_DATE - 365;

      `)
      .then(dbRes => {
        console.log(dbRes[0])
        // res.status(200).send(dbRes[0]);
        res.status(200).send({
          today: {
            listingViews: dbRes[0].filter(item => item.listings_views_today)[0]?.listings_views_today,
            shopViews: dbRes[0].filter(item => item.total_views_today)[0]?.total_views_today,
            orders: dbRes[0].filter(item => item.orders_today)[0]?.orders_today || '0',
            revenue: dbRes[0].filter(item => item.revenue_today)[0]?.revenue_today || '0'
          },
          yesterday: {
            listingViews: dbRes[0].filter(item => item.listings_views_yesterday)[0]?.listings_views_yesterday,
            shopViews: dbRes[0].filter(item => item.total_views_yesterday)[0]?.total_views_yesterday,
            orders: dbRes[0].filter(item => item.orders_yesterday)[0]?.orders_yesterday || 0,
            revenue: dbRes[0].filter(item => item?.revenue_yesterday)[0]?.revenue_yesterday || 0
          },
          last7Days: {
            listingViews: dbRes[0].filter(item => item.listings_views_seven)[0]?.listings_views_seven,
            shopViews: dbRes[0].filter(item => item.total_views_seven)[0]?.total_views_seven,
            orders: dbRes[0].filter(item => item.orders_seven)[0]?.orders_seven || 0,
            revenue: dbRes[0].filter(item => item.revenue_seven)[0]?.revenue_seven || 0
          },
          last30Days: {
            listingViews: dbRes[0].filter(item => item.listings_views_thirty)[0]?.listings_views_thirty,
            shopViews: dbRes[0].filter(item => item.total_views_thirty)[0]?.total_views_thirty,
            orders: dbRes[0].filter(item => item.orders_thirty)[0]?.orders_thirty || 0,
            revenue: dbRes[0].filter(item => item.revenue_thirty)[0]?.revenue_thirty || 0
          },
          last90Days: {
            listingViews: dbRes[0].filter(item => item.listings_views_ninety)[0]?.listings_views_ninety,
            shopViews: dbRes[0].filter(item => item.total_views_ninety)[0]?.total_views_ninety,
            orders: dbRes[0].filter(item => item.orders_ninety)[0]?.orders_ninety || 0,
            revenue: dbRes[0].filter(item => item.revenue_ninety)[0]?.revenue_ninety || 0
          },
          last365Days: {
            listingViews: dbRes[0].filter(item => item.listings_views_year)[0]?.listings_views_year,
            shopViews: dbRes[0].filter(item => item.total_views_year)[0]?.total_views_year,
            orders: dbRes[0].filter(item => item.orders_year)[0]?.orders_year || 0,
            revenue: dbRes[0].filter(item => item.revenue_year)[0]?.revenue_year || 0
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })  

  }
}