import { getWeatherTileUrl } from "../utils/map";

function WeatherMapPreview({ coordinates, title }) {
  const mapUrl = getWeatherTileUrl(coordinates.lat, coordinates.lon);

  return (
    <article className="glass-card map-panel">
      <div className="card-header">
        <div>
          <p className="eyebrow">Weather map</p>
          <h2>Cloud layer preview</h2>
          <p className="muted">{title}</p>
        </div>
      </div>

      <div className="map-preview">
        <img src={mapUrl} alt={`Weather map preview for ${title}`} />
        <div className="map-overlay">
          <span>Lat {coordinates.lat.toFixed(2)}</span>
          <span>Lon {coordinates.lon.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}

export default WeatherMapPreview;
