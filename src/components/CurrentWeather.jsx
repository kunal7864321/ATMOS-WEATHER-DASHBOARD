import { formatTemperature, formatTime } from "../utils/formatters";

function CurrentWeather({ current, unit }) {
  const weather = current.weather?.[0];

  return (
    <article className="glass-card current-weather card-hover">
      <div className="card-header">
        <div>
          <p className="eyebrow">Current weather</p>
          <h2>{weather?.main ?? "Weather overview"}</h2>
          <p className="muted">{weather?.description}</p>
        </div>
        {weather ? (
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        ) : null}
      </div>

      <div className="current-temp">
        {formatTemperature(current.main.temp, unit)}
      </div>

      <div className="temperature-range">
        <span>Feels like {formatTemperature(current.main.feels_like, unit)}</span>
        <span>
          H:{formatTemperature(current.main.temp_max, unit)} / L:
          {formatTemperature(current.main.temp_min, unit)}
        </span>
      </div>

      <div className="sun-cycle">
        <div>
          <span className="muted">Sunrise</span>
          <strong>{formatTime(current.sys.sunrise, current.timezone)}</strong>
        </div>
        <div>
          <span className="muted">Sunset</span>
          <strong>{formatTime(current.sys.sunset, current.timezone)}</strong>
        </div>
      </div>
    </article>
  );
}

export default CurrentWeather;
