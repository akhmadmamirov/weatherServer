class Weather {
    constructor(city) {
      this.city = city;
      this.geoApi = process.env.GEO_API_KEY;
      this.apiKey = process.env.OPENWEATHER_API_KEY;
    }
  
    // Get coordinates for a city
    async getCoordinates() {
      const fetch = (await import('node-fetch')).default;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.city}&key=${this.geoApi}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.results[0].geometry.location;
        const latitude = result.lat;
        const longitude = result.lng;
        return { latitude, longitude };
      } catch (error) {
        console.error(error);
      }
    }
  
    // Fetch Current Weather
    async getCurrentWeather() {
      const fetch = (await import('node-fetch')).default;
      const coordinates = await this.getCoordinates();
      const longitude = coordinates.longitude;
      const latitude = coordinates.latitude;
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`
      );
      const data = await response.json();
  
      // Extract five-day forecast data
      const forecast = [];
      for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000);
        const celsiusTemp = (dayData.main.temp - 273.15).toFixed(1);
        const weather = {
          date: date.toDateString(),
          temp: celsiusTemp,
          description: dayData.weather[0].description,
          icon: dayData.weather[0].icon,
        };
        forecast.push(weather);
      }
  
      return forecast;
    }
  
    // Fetch weather now
    async getWeatherNow() {
      const fetch = (await import('node-fetch')).default;
      const { latitude, longitude } = await this.getCoordinates();
  
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    // Change weather location
    changeLocation(city) {
      this.city = city;
    }
  }
  
  module.exports = Weather;
  