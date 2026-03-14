function ThemeToggle({ theme, unit, onThemeToggle, onUnitToggle }) {
  return (
    <div className="toggle-cluster">
      <button className="toggle-button" type="button" onClick={onThemeToggle}>
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
      <button className="toggle-button" type="button" onClick={onUnitToggle}>
        {unit === "metric" ? "Show °F" : "Show °C"}
      </button>
    </div>
  );
}

export default ThemeToggle;
