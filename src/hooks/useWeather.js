import { useCallback, useEffect, useState } from "react";
import {
  fetchCurrentWeatherByCoords,
  fetchFiveDayForecastByCoords,
  fetchLocationByCity,
} from "../services/openWeather";
import {
  addRecentCity,
  getRecentCities,
} from "../utils/storage";

function groupForecastByDay(forecastList) {
  const dayMap = new Map();

  forecastList.forEach((entry) => {
    const dayKey = entry.dt_txt.slice(0, 10);
    const existingDay = dayMap.get(dayKey);

    if (!existingDay) {
      dayMap.set(dayKey, [entry]);
      return;
    }

    existingDay.push(entry);
  });

  return Array.from(dayMap.values())
    .slice(0, 7)
    .map((entries) => {
      const middayEntry =
        entries.find((entry) => entry.dt_txt.includes("12:00:00")) ||
        entries[Math.floor(entries.length / 2)];

      const temperatures = entries.map((entry) => entry.main.temp);
      const humidities = entries.map((entry) => entry.main.humidity);
      const windSpeeds = entries.map((entry) => entry.wind.speed);

      return {
        dt: middayEntry.dt,
        temp: {
          day: middayEntry.main.temp,
          min: Math.min(...temperatures),
          max: Math.max(...temperatures),
        },
        humidity: Math.round(
          humidities.reduce((sum, value) => sum + value, 0) / humidities.length,
        ),
        wind_speed:
          windSpeeds.reduce((sum, value) => sum + value, 0) / windSpeeds.length,
        weather: middayEntry.weather,
      };
    });
}

export function useWeather(unit) {
  const [weatherBundle, setWeatherBundle] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setRecentCities(getRecentCities());
  }, []);

  const fetchWeatherBundle = useCallback(
    async (latitude, longitude, cityLabel) => {
      setLoading(true);
      setError("");

      try {
        const current = await fetchCurrentWeatherByCoords(latitude, longitude, unit);
        const forecastResponse = await fetchFiveDayForecastByCoords(
          latitude,
          longitude,
          unit,
        );
        const normalizedForecast = groupForecastByDay(forecastResponse.list);

        if (!normalizedForecast.length) {
          throw new Error("Weather service request failed. Please try again.");
        }

        const location = {
          name: cityLabel || current.name,
          country: current.sys.country,
          state: "",
        };

        setWeatherBundle({
          location,
          coordinates: { lat: latitude, lon: longitude },
          current,
          forecast: normalizedForecast,
        });

        if (location.name) {
          const nextRecent = addRecentCity(location.name);
          setRecentCities(nextRecent);
        }
      } catch (requestError) {
        setError(requestError.message || "Unable to fetch weather data.");
      } finally {
        setLoading(false);
      }
    },
    [unit],
  );

  const fetchByCity = useCallback(
    async (city) => {
      setLoading(true);
      setError("");

      try {
        const location = await fetchLocationByCity(city);
        await fetchWeatherBundle(location.lat, location.lon, location.name);
      } catch (requestError) {
        setError(requestError.message || "City not found.");
        setLoading(false);
      }
    },
    [fetchWeatherBundle],
  );

  const fetchByCoords = useCallback(
    async (latitude, longitude) => {
      await fetchWeatherBundle(latitude, longitude);
    },
    [fetchWeatherBundle],
  );

  return {
    weatherBundle,
    loading,
    error,
    recentCities,
    fetchByCity,
    fetchByCoords,
  };
}
