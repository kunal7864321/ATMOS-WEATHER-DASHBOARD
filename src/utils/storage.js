const STORAGE_KEY = "recent-weather-cities";

export function getRecentCities() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch {
    return [];
  }
}

export function addRecentCity(city) {
  const nextCities = [city, ...getRecentCities().filter((entry) => entry !== city)].slice(0, 5);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCities));
  return nextCities;
}
