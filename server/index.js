const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {uploadFile, deleteFile} = require('./s3');
const sequelize = require("./sequelize");
const fs = require('fs');
const cors = require('cors')
const moment = require('moment');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use('/static',express.static(path.join(__dirname, '/assets/static')));

// controllers
const { 
  createUser, loginUser, getAllFavorites,
  addFavorite, removeFavorite, getProfilePic 
} = require('./controllers/userController');
const { fetchCategories } = require('./controllers/categoryController');
const { 
  getListing, getPopularListings, fetchViewed, addViewed, fetchListings, getPopularSearchTerms, addListing, deleteListing  
} = require('./controllers/listingController');
const {
getCart, addToCart, removeFromCart, updateCart, clearCart
} = require('./controllers/cartController');
const { fetchViewShops, fetchShop } = require('./controllers/shopController');
const { becomeSeller, getShopDashboardInfo, getShopDashboardAccount } = require('./controllers/sellerController');
const { setUserImage, getPriorUserImageKey, setLogoImage,
  getPriorLogoImageKey, setCoverImage, getPriorCoverImageKey, setListingImage, getPriorListingImageKey, getAllListingImageKeys 
} = require('./controllers/imgController');
const { createRoom, getAllRooms, getMessages, sendMessage } = require('./controllers/messageController');


// Seed File
const { seed } = require('./db/dbSeed')
app.post(`/api/seed`, seed)

// ENDPOINTS
  // api/users
  app.post(`/api/users/register`, createUser);
  app.post(`/api/users/login`, loginUser);
  app.get('/api/users/verify', verifyToken, (req, res) => {
    console.log('req.user.profilepic', req.user.profilePic)
    console.log('req.user.isVendor', req.user.isVendor)
    res.status(200).send({
      token: req.token,
      isVendor: req.user.isVendor,
      username: req.user.username,
      profilePic: req.user.profilePic,
    });
  });

  app.get('/api/user/profilePic', verifyToken, getProfilePic);

  app.get(`/api/user/favorites`, verifyToken, getAllFavorites)
  app.post(`/api/user/favorites`, verifyToken, addFavorite)
  app.delete(`/api/user/favorites/:id`, verifyToken, removeFavorite)

  app.get('/api/shop/dashboard/account', verifyShopToken, getShopDashboardAccount)

  // /api/users/cart

  app.get('/api/user/cart', verifyToken, getCart)
  app.post('/api/user/cart/item', verifyToken, addToCart)
  app.put('/api/user/cart/item/:cartItemId', verifyToken, updateCart)
  app.delete('/api/user/cart/item/:cartItemId', verifyToken, removeFromCart)
  app.delete('/api/user/cart', verifyToken, clearCart)

  // /api/users/becomeSeller
  app.post('/api/user/becomeSeller', verifyToken, becomeSeller)

  // /api/listing

  app.get(`/api/listings/:id`, getListing);
  app.post('/api/listings', verifyShopToken, addListing)
  app.delete('/api/listings/:id', verifyShopToken, async (req, res, next) => {
    const {main_photo_key, photo_two_key, photo_three_key, photo_four_key, photo_five_key} = await getAllListingImageKeys(req.params.id)

   async function deleteKey(key) {
    try {
      await deleteFile(key);
    } catch (err) {
      console.log(err);
    }
  }
  deleteKey(main_photo_key)
  deleteKey(photo_two_key)
  deleteKey(photo_three_key)
  deleteKey(photo_four_key)
  deleteKey(photo_five_key)
    
      next()
  }, deleteListing)

  // /api/listing/popular

  app.get('/api/listing/popular', getPopularListings);
  app.post('/api/search', fetchListings)

  // api/categories
app.get('/api/categories', fetchCategories)

// /api/shops
app.get('/api/home/view/shops', fetchViewShops)
app.get('/api/shops/:shopId', fetchShop)

// /api/home/recently/viewed
app.get('/api/home/recently/viewed', verifyToken, fetchViewed)
app.post('/api/home/recently/viewed', verifyToken, addViewed)

// /api/popular-search-terms
app.get('/api/popular-search-terms', getPopularSearchTerms);

app.get('/api/shop/dashboard/info', verifyShopToken, getShopDashboardInfo)

app.post('/api/image/profile/s3/bucket', verifyToken, upload.single('image'), async (req, res) => {
 const file = req.file
 try{
   try{
     const priorKey = await getPriorUserImageKey(req.user.user_id)
      if (priorKey) {
        await deleteFile(priorKey)
      }
   } catch(err) {
     console.log(err)
   }

   const result = await uploadFile(file)
   const dbResult = await setUserImage(req.user.user_id, result.Key, result.Location)
   res.status(200).send(dbResult)
 } catch(err) {
    console.log(err)
    res.status(500).send(err)
  } finally {
    try{fs.unlinkSync(file.path)}
    catch(err){console.log(err)}
  }
  
});

app.post('/api/image/shop-cover/s3/bucket', verifyToken, upload.single('image'), async (req, res) => {
  const file = req.file
  try{
    try{
      const priorKey = await getPriorCoverImageKey(req.user.user_id)
       if (priorKey) {
         await deleteFile(priorKey)
       }
    } catch(err) {
      console.log(err)
    }
 
    const result = await uploadFile(file)
    const dbResult = await setCoverImage(req.user.user_id, result.Key, result.Location)
    res.status(200).send(dbResult)
  } catch(err) {
     console.log(err)
     res.status(500).send(err)
   } finally {
     try{fs.unlinkSync(file.path)}
     catch(err){console.log(err)}
   }
   
 });

 app.post('/api/image/shop-logo/s3/bucket', verifyToken, upload.single('image'), async (req, res) => {
  const file = req.file
  try{
    try{
      const priorKey = await getPriorLogoImageKey(req.user.user_id)
       if (priorKey) {
         await deleteFile(priorKey)
       }
    } catch(err) {
      console.log(err)
    }
 
    const result = await uploadFile(file)
    const dbResult = await setLogoImage(req.user.user_id, result.Key, result.Location)
    res.status(200).send(dbResult)
  } catch(err) {
     console.log(err)
     res.status(500).send(err)
   } finally {
     try{fs.unlinkSync(file.path)}
     catch(err){console.log(err)}
   }
   
 });

 app.post('/api/image/listing-photo/s3/bucket/:id', verifyToken, upload.single('image'), async (req, res) => {
  const file = req.file
  try{
    try{
      const priorKey = await getPriorListingImageKey(req.params.id, req.query.type)
       if (priorKey) {
         await deleteFile(priorKey)
       }
    } catch(err) {
      console.log(err)
    }
 
    const result = await uploadFile(file)
    const dbResult = await setListingImage(req.params.id, result.Key, result.Location, req.query.type)
    res.status(200).send(dbResult)
  } catch(err) {
     console.log(err)
     res.status(500).send(err)
   } finally {
     try{fs.unlinkSync(file.path)}
     catch(err){console.log(err)}
   }
   
 });

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



function verifyShopToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (!user.isVendor) return res.sendStatus(403);
    req.user = user;
    req.token = token;
    console.log(user)
    next();
});
}

function signNewToken(req, res, next) {
  const {user_id} = req.user;
  
  sequelize.query(`SELECT * FROM users WHERE user_id = '${user_id}'`)
  .then(dbRes => {

    const body = {
      user_id: dbRes[0][0].user_id,
      username: dbRes[0][0].username,
      email: dbRes[0][0].email,
      first_name: dbRes[0][0].first_name,
      last_name: dbRes[0][0].last_name,
      phone: dbRes[0][0].phone,
      address_line_one: dbRes[0][0].address_line_one,
      address_line_two: dbRes[0][0].address_line_two,
      city: dbRes[0][0].city,
      state: dbRes[0][0].state,
      zipcode: dbRes[0][0].zipcode,
      isVendor: dbRes[0][0].isvendor,
      profilePic: dbRes[0][0].profile_img,
    }


    const token = jwt.sign(
      body,
      process.env.JWT_SECRET
      
    );
    req.user = body
    req.token = token
  })
}

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', socket => {
  console.log('new websocket connection')

  socket.on('create_room', async (data) => {
    const room = await createRoom(data)
    socket.emit('room_created', room)
  })

  socket.on('get_all_rooms', async (data) => {
    const rooms = await getAllRooms(data)
    socket.emit('all_rooms', rooms)
  })

  // socket.on('get_shop_messages', async (data) => {
  //   const messages = await getShopMessages(data)
  //   socket.emit('shop_messages', messages)
  // })

  socket.on('get_messages', async (data) => {
    console.log(data)
    const messages = await getMessages(data)
    const messagesWithUser = messages.map(message => {
      return {
        ...message,
        created_at: moment(message.created_at).format('h:mm a')
      }
    })   
    socket.emit('all_messages', messagesWithUser)
  })

  socket.on('join_room', (data) => {
    console.log('room',data)
    socket.join(data)
  })

  socket.on('message', async (data) => {
    const {message, room, sender} = data
    const dbResult = await sendMessage(data)
    console.log('dbResult',dbResult)
    console.log('broadcasted room', room)
    socket.broadcast.to(room).emit('recieve_message', {dbResult})
    
})
})


const port = process.env.PORT || 5000;


server.listen(port, () => console.log(`Server started on port ${port}`));