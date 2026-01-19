import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OverlappingBarChart() {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales 2024",
        data: [30, 40, 25, 50, 35],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        barPercentage: 0.4, // Width of the bar
        categoryPercentage: 0.6, // Space between bars
      },
      {
        label: "Sales 2025",
        data: [40, 35, 45, 30, 50],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        barPercentage: 0.4,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overlapping Bar Chart Example",
      },
    },
    scales: {
      x: {
        stacked: false, // Keep it false to allow overlapping
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
