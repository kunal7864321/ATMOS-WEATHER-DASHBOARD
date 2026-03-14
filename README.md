# Atmos Weather Dashboard

A modern weather dashboard built with React, JavaScript, and Chart.js. It includes current conditions, a 7-day forecast, weather metric charts, geolocation support, dark mode, unit switching, recent searches, and a weather map preview.

## Features

- Search weather by city
- Current weather and 7-day forecast
- Temperature, humidity, and wind charts with Chart.js
- Geolocation-based weather lookup
- Recent searched cities persisted in local storage
- Dynamic weather backgrounds and dark mode
- Responsive UI with animated loading skeletons
- Weather details for humidity, wind, pressure, sunrise, and sunset
- Weather map preview powered by OpenWeather tile layers

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kunal7864321/ATMOS-WEATHER-DASHBOARD.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Get an API key from [OpenWeather](https://openweathermap.org/api) and add it to your `.env` file:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

For deployment, set the environment variable `VITE_OPENWEATHER_API_KEY` in your hosting platform (e.g., Vercel, Netlify). Do not commit your `.env` file to the repository.

## Notes

- The app uses OpenWeather Geocoding, Current Weather, and One Call APIs.
- If your OpenWeather account does not have One Call access enabled, forecast data may fail until that API is available on your plan.
