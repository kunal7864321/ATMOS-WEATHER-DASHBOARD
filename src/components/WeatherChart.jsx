import { useMemo, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { formatDayShort, getUnitLabel, getWindUnitLabel } from "../utils/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const CHARTS = [
  { id: "temperature", label: "Temperature" },
  { id: "humidity", label: "Humidity" },
  { id: "wind", label: "Wind speed" },
];

function WeatherChart({ forecast, unit }) {
  const [activeChart, setActiveChart] = useState("temperature");

  const labels = useMemo(
    () => forecast.map((day) => formatDayShort(day.dt)),
    [forecast],
  );

  const chartConfig = useMemo(() => {
    if (activeChart === "humidity") {
      return {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Humidity",
              data: forecast.map((day) => day.humidity),
              backgroundColor: "rgba(105, 224, 255, 0.6)",
              borderRadius: 14,
            },
          ],
        },
      };
    }

    if (activeChart === "wind") {
      return {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Wind speed",
              data: forecast.map((day) => day.wind_speed),
              backgroundColor: "rgba(255, 196, 112, 0.68)",
              borderRadius: 14,
            },
          ],
        },
      };
    }

    return {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature",
            data: forecast.map((day) => day.temp.day),
            borderColor: "rgba(255, 132, 94, 1)",
            backgroundColor: "rgba(255, 132, 94, 0.18)",
            fill: true,
            tension: 0.38,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
    };
  }, [activeChart, forecast, labels]);

  const unitsLabel =
    activeChart === "temperature"
      ? getUnitLabel(unit)
      : activeChart === "humidity"
        ? "%"
        : getWindUnitLabel(unit);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#f8fafc",
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#dbe4ff" },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#dbe4ff",
          callback: (value) => `${value}${unitsLabel}`,
        },
        grid: { color: "rgba(255,255,255,0.08)" },
      },
    },
  };

  return (
    <article className="glass-card chart-panel">
      <div className="card-header chart-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Weather trends over the next {forecast.length} days</h2>
        </div>
        <div className="chart-switcher">
          {CHARTS.map((chart) => (
            <button
              key={chart.id}
              type="button"
              className={`chart-chip ${activeChart === chart.id ? "active" : ""}`}
              onClick={() => setActiveChart(chart.id)}
            >
              {chart.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-canvas">
        {chartConfig.type === "line" ? (
          <Line data={chartConfig.data} options={options} />
        ) : (
          <Bar data={chartConfig.data} options={options} />
        )}
      </div>
    </article>
  );
}

export default WeatherChart;
