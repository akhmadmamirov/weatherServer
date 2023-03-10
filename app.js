const express = require('express');
const app = express();

// Allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define a route to retrieve the API key
app.get('/apikey', (req, res) => {
  // Replace this with your actual API key
  const apiKey = 'ecf82537022ea68bfe294599ccd9bfb2';
  const geoApi = 'AIzaSyBazbYas6WlmtCflXovhVkwXscJG3Kqd_w';
  res.send({ apiKey, geoApi });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
