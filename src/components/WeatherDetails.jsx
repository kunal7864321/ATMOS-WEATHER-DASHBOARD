import {
  formatPressure,
  formatSpeed,
  formatTemperature,
} from "../utils/formatters";

function WeatherDetails({ current, today, unit }) {
  const detailItems = [
    { label: "Humidity", value: `${current.main.humidity}%` },
    { label: "Wind speed", value: formatSpeed(current.wind.speed, unit) },
    { label: "Pressure", value: formatPressure(current.main.pressure) },
    { label: "Visibility", value: `${(current.visibility / 1000).toFixed(1)} km` },
    { label: "Daily high", value: formatTemperature(today.temp.max, unit) },
    { label: "Daily low", value: formatTemperature(today.temp.min, unit) },
  ];

  return (
    <article className="glass-card details-panel">
      <div className="card-header">
        <div>
          <p className="eyebrow">Weather details</p>
          <h2>Key metrics at a glance</h2>
        </div>
      </div>

      <div className="details-grid">
        {detailItems.map((item) => (
          <div key={item.label} className="detail-tile card-hover">
            <span className="muted">{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

export default WeatherDetails;
