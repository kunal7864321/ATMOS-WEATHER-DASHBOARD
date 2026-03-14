export function getThemeClass(condition = "Clear", theme = "dark") {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes("rain") || normalizedCondition.includes("drizzle")) {
    return theme === "dark" ? "theme-storm-dark" : "theme-storm-light";
  }

  if (normalizedCondition.includes("cloud")) {
    return theme === "dark" ? "theme-cloud-dark" : "theme-cloud-light";
  }

  if (normalizedCondition.includes("snow")) {
    return theme === "dark" ? "theme-snow-dark" : "theme-snow-light";
  }

  return theme === "dark" ? "theme-clear-dark" : "theme-clear-light";
}
