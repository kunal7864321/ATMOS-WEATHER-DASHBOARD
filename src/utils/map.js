const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function coordinateToTile(lat, lon, zoom = 5) {
  const latitudeRadians = (lat * Math.PI) / 180;
  const tiles = 2 ** zoom;
  const x = Math.floor(((lon + 180) / 360) * tiles);
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI) / 2) *
      tiles,
  );

  return { x, y, zoom };
}

export function getWeatherTileUrl(lat, lon) {
  const { x, y, zoom } = coordinateToTile(lat, lon);

  return `https://tile.openweathermap.org/map/clouds_new/${zoom}/${x}/${y}.png?appid=${API_KEY}`;
}
