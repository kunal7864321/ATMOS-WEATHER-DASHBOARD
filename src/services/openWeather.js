const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to your .env file.");
  }
}

async function requestJson(url) {
  ensureApiKey();

  const response = await fetch(url);
  const payload = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Try another search.");
    }

    throw new Error(payload?.message || "Weather service request failed. Please try again.");
  }

  return payload;
}

export async function fetchLocationByCity(city) {
  const params = new URLSearchParams({
    q: city,
    limit: "1",
    appid: API_KEY,
  });

  const locations = await requestJson(`${BASE_URL}/geo/1.0/direct?${params.toString()}`);
  if (!locations.length) {
    throw new Error("City not found. Try another search.");
  }

  return locations[0];
}

export async function fetchCurrentWeatherByCoords(lat, lon, unit) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units: unit,
    appid: API_KEY,
  });

  return requestJson(`${BASE_URL}/data/2.5/weather?${params.toString()}`);
}

export async function fetchFiveDayForecastByCoords(lat, lon, unit) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    units: unit,
    appid: API_KEY,
  });

  return requestJson(`${BASE_URL}/data/2.5/forecast?${params.toString()}`);
}
