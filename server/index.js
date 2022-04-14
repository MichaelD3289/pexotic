const express = require('express');

const app = express();

// middleware
app.use(express.json());

// controllers
const {} = require('./controllers/userController');

// Seed File
const { seed } = require('./db/dbSeed')
app.post(`/api/seed`, seed)

// ENDPOINTS
  // api/users



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));