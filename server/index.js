const express = require('express');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use('/static',express.static(path.join(__dirname, '/assets/static')));

// controllers
const {} = require('./controllers/userController');
const { categoryImg } = require('./controllers/images/imgController');
const { fetchCategories } = require('./controllers/categoryController');

// Seed File
const { seed } = require('./db/dbSeed')
app.post(`/api/seed`, seed)

// ENDPOINTS
  // api/users
app.get('/assets/category/images', categoryImg)

app.get('/api/categories', fetchCategories)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));