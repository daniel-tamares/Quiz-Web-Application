import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { studentGraph } from "../actions";
import { data } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function GroupedBarChart() {

    const [score, setScore] = useState(null);
    const [title, setTitle] = useState(null);
    const [mc, setMc] = useState(null);
    const [cb, setBc] = useState(null);

    useEffect( () => {
        fetchData();
    }, [] );

    const fetchData = async () => {
        try {
            const res = await studentGraph();
            setScore(res?.score);
            setTitle(res?.title2);

            setMc(res?.mc);
            setBc(res?.cb);

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  const data = {
    labels: title,
    datasets: [
      {
        label: "Multiple Choice",
        data: mc,
        backgroundColor: "rgba(75, 192, 192, 0.7)"
      },
      {
        label: "Choice in the Box",
        data: cb,
        backgroundColor: "rgba(255, 99, 132, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Grouped Bar Chart Example"
      }
    }
  };

  return <Bar data={data} options={options} />;
}
