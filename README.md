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

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your OpenWeather API key to `.env`:

```bash
VITE_OPENWEATHER_API_KEY=your_key_here
```

4. Start the app:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Notes

- The app uses OpenWeather Geocoding, Current Weather, and One Call APIs.
- If your OpenWeather account does not have One Call access enabled, forecast data may fail until that API is available on your plan.
