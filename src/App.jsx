import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import ForecastCards from "./components/ForecastCards";
import LoadingSkeleton from "./components/LoadingSkeleton";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import WeatherChart from "./components/WeatherChart";
import WeatherDetails from "./components/WeatherDetails";
import WeatherMapPreview from "./components/WeatherMapPreview";
import { useWeather } from "./hooks/useWeather";
import { formatLocationLabel } from "./utils/formatters";
import { getThemeClass } from "./utils/weatherThemes";

const INITIAL_CITY = "New York";

function App() {
  const [theme, setTheme] = useState("dark");
  const [unit, setUnit] = useState("metric");
  const {
    weatherBundle,
    loading,
    error,
    recentCities,
    fetchByCity,
    fetchByCoords,
  } = useWeather(unit);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("weather-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("weather-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!weatherBundle) {
      fetchByCity(INITIAL_CITY);
    }
  }, [fetchByCity, weatherBundle]);

  useEffect(() => {
    if (!navigator.geolocation || weatherBundle) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchByCoords(coords.latitude, coords.longitude);
      },
      () => {
        fetchByCity(INITIAL_CITY);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, [fetchByCity, fetchByCoords, weatherBundle]);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const handleUnitToggle = () => {
    setUnit((currentUnit) => (currentUnit === "metric" ? "imperial" : "metric"));
  };

  const weatherThemeClass = getThemeClass(
    weatherBundle?.current?.weather?.[0]?.main,
    theme,
  );

  return (
    <div className={`app-shell ${weatherThemeClass}`}>
      <div className="app-backdrop" />
      <main className="dashboard">
        <section className="hero-card glass-card">
          <div className="hero-topbar">
            <div>
              <p className="eyebrow">Atmos Dashboard</p>
              <h1>Weather intelligence for every day ahead.</h1>
              <p className="hero-copy">
                Track current conditions, forecast trends, and essential metrics in
                a polished dashboard built for modern frontend portfolios.
              </p>
            </div>
            <ThemeToggle
              theme={theme}
              unit={unit}
              onThemeToggle={handleThemeToggle}
              onUnitToggle={handleUnitToggle}
            />
          </div>

          <SearchBar
            onSearch={fetchByCity}
            onLocate={fetchByCoords}
            recentCities={recentCities}
            loading={loading}
          />

          {weatherBundle ? (
            <p className="location-pill">
              Live for {formatLocationLabel(weatherBundle.location)}
            </p>
          ) : null}

          {error ? <div className="status-banner error">{error}</div> : null}
        </section>

        {loading && !weatherBundle ? (
          <LoadingSkeleton />
        ) : weatherBundle ? (
          <>
            <section className="grid-primary">
              <CurrentWeather current={weatherBundle.current} unit={unit} />
              <WeatherDetails
                current={weatherBundle.current}
                today={weatherBundle.forecast[0]}
                unit={unit}
              />
            </section>

            <section className="grid-secondary">
              <ForecastCards
                forecast={weatherBundle.forecast}
                unit={unit}
              />
              <WeatherMapPreview
                coordinates={weatherBundle.coordinates}
                title={formatLocationLabel(weatherBundle.location)}
              />
            </section>

            <WeatherChart forecast={weatherBundle.forecast} unit={unit} />
          </>
        ) : (
          <LoadingSkeleton />
        )}
      </main>
    </div>
  );
}

export default App;
