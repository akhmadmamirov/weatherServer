const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Weather = require('./weather.js');

dotenv.config();


const app = express();

// Allow cross-origin requests
app.use(cors());



// Define a route to retrieve the current weather data
app.get('/weather/current/:city', async (req, res) => {
  const city = req.params.city;
  const weather = new Weather(city);
  const data = await weather.getWeatherNow();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

// Define a route to retrieve the weather forecast data
app.get('/weather/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const weather = new Weather(city);
  const data = await weather.getCurrentWeather();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
