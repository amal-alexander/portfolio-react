import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SEOChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "SEO Metrics",
                data: data.values,
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.6)",
                hoverBorderColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: "top" },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            title: {
                display: true,
                text: "SEO Metrics Overview",
                font: { size: 16 },
            },
        },
        scales: {
            x: { grid: { display: false }, title: { display: true, text: "Metrics" } },
            y: { beginAtZero: true, grid: { color: "rgba(200, 200, 200, 0.3)" }, title: { display: true, text: "Count" } },
        },
    };

    return (
        <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
            <h2 style={{ textAlign: "center", color: "#666" }}>SEO Chart</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SEOChart;
