import { formatDay, formatTemperature } from "../utils/formatters";

function ForecastCards({ forecast, unit }) {
  return (
    <article className="glass-card forecast-panel">
      <div className="card-header">
        <div>
          <p className="eyebrow">{forecast.length}-day forecast</p>
          <h2>What the next few days look like</h2>
        </div>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <div key={day.dt} className="forecast-card card-hover">
            <p className="forecast-day">{formatDay(day.dt)}</p>
            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <strong>{formatTemperature(day.temp.day, unit)}</strong>
            <span className="muted">
              {formatTemperature(day.temp.max, unit)} /{" "}
              {formatTemperature(day.temp.min, unit)}
            </span>
            <span className="forecast-summary">{day.weather[0].description}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default ForecastCards;
