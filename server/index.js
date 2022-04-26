const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());
app.use('/static',express.static(path.join(__dirname, '/assets/static')));

// controllers
const { 
  createUser, loginUser, getAllFavorites,
  addFavorite, removeFavorite 
} = require('./controllers/userController');
const {  } = require('./controllers/images/imgController');
const { fetchCategories } = require('./controllers/categoryController');
const { 
  getListing, getPopularListings, fetchViewed, addViewed  
} = require('./controllers/listingController');
const {
getCart, addToCart, removeFromCart, updateCart, clearCart
} = require('./controllers/cartController');
const { fetchViewShops, fetchShop } = require('./controllers/shopController');


// Seed File
const { seed } = require('./db/dbSeed')
app.post(`/api/seed`, seed)

// ENDPOINTS
  // api/users
  app.post(`/api/users/register`, createUser);
  app.post(`/api/users/login`, loginUser);
  app.get('/api/users/verify', verifyToken, (req, res) => {
    res.status(200).send(req.token);
  });

  app.get(`/api/user/favorites`, verifyToken, getAllFavorites)
  app.post(`/api/user/favorites`, verifyToken, addFavorite)
  app.delete(`/api/user/favorites/:id`, verifyToken, removeFavorite)

  // /api/users/cart

  app.get('/api/user/cart', verifyToken, getCart)
  app.post('/api/user/cart/item', verifyToken, addToCart)
  app.put('/api/user/cart/item/:cartItemId', verifyToken, updateCart)
  app.delete('/api/user/cart/item/:cartItemId', verifyToken, removeFromCart)
  app.delete('/api/user/cart', verifyToken, clearCart)

  // /api/listing

  app.get(`/api/listings/:id`, getListing);

  // /api/listing/popular

  app.get('/api/listing/popular', getPopularListings);
  

  // api/categories
app.get('/api/categories', fetchCategories)

// /api/shops
app.get('/api/home/view/shops', fetchViewShops)
app.get('/api/shops/:shopId', fetchShop)

// /api/home/recently/viewed
app.get('/api/home/recently/viewed', verifyToken, fetchViewed)
app.post('/api/home/recently/viewed', verifyToken, addViewed)

// Verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.token = token;
    next();
});
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));