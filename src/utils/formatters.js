export function formatTemperature(value, unit) {
  return `${Math.round(value)}${unit === "metric" ? "°C" : "°F"}`;
}

export function formatSpeed(value, unit) {
  return `${value.toFixed(1)} ${unit === "metric" ? "m/s" : "mph"}`;
}

export function formatPressure(value) {
  return `${value} hPa`;
}

export function formatDay(unixTime) {
  return new Date(unixTime * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

export function formatDayShort(unixTime) {
  return new Date(unixTime * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function formatTime(unixTime, timezoneOffsetSeconds) {
  const date = new Date((unixTime + timezoneOffsetSeconds) * 1000);
  return date.toUTCString().slice(17, 22);
}

export function formatLocationLabel(location) {
  return [location.name, location.state, location.country].filter(Boolean).join(", ");
}

export function getUnitLabel(unit) {
  return unit === "metric" ? "°C" : "°F";
}

export function getWindUnitLabel(unit) {
  return unit === "metric" ? "m/s" : "mph";
}
