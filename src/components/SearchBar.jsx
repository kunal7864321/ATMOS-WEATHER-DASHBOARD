import { useState } from "react";

function SearchBar({ onSearch, onLocate, recentCities, loading }) {
  const [city, setCity] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
    setCity("");
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onLocate(coords.latitude, coords.longitude);
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="search-block">
      <form className="searchbar" onSubmit={handleSubmit}>
        <label className="searchbar-label" htmlFor="city-search">
          Search by city
        </label>
        <div className="searchbar-row">
          <input
            id="city-search"
            className="search-input"
            type="text"
            placeholder="Search for London, Tokyo, Mumbai..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button className="action-button primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
          <button
            className="action-button"
            type="button"
            onClick={handleLocate}
            disabled={locationLoading}
          >
            {locationLoading ? "Locating..." : "Use my location"}
          </button>
        </div>
      </form>

      {recentCities.length > 0 ? (
        <div className="recent-searches">
          <span className="recent-label">Recent searches</span>
          <div className="recent-list">
            {recentCities.map((recentCity) => (
              <button
                key={recentCity}
                className="recent-city"
                type="button"
                onClick={() => onSearch(recentCity)}
              >
                {recentCity}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
