import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { studentGraph } from "../actions";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TwoLineGraph = () => {

    const [score, setScore] = useState(null);
    const [items, setItems] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect( () => {
        fetchData();
    }, [] );

    const fetchData = async () => {
        try {
            const res = await studentGraph();
            setScore(res?.score);
            setTitle(res?.title);
            setItems(res?.items);

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  const data = {
    labels: items,
    datasets: [
      {
        label: "Tartget",
        data: items,
        borderColor: "rgba(83, 34, 180, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3, // smooth curves
      },
      {
        label: "Score",
        data: score,
        borderColor: "rgba(234, 20, 120, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.5,
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
        text: "Quizzes Target",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TwoLineGraph;
