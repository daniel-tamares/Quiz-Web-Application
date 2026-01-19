import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { studentGraph } from '../actions';
import BarGraph from './BarGraph';
import TwoLineGraph from './TwoLineGraph';
import OverlappingBarChart from './OverLappingBar';


// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {

    const [score, setScore] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect( () => {
        fetchData();
    }, [] );

    const fetchData = async () => {
        try {
            const res = await studentGraph();
            setScore(res?.score);
            setTitle(res?.title);

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  const data = {
    labels: title,
    datasets: [
      {
        label: 'Sales',
        data: score,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        tension: 0.4, // curve of line
        fill: true,
        width: 100,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales Data' }
    }
  };

  return (
    <div>
        <Line data={data} options={options} />
        <div>
          <BarGraph/>
          <TwoLineGraph/>
        </div>
    </div>
  );
};

export default LineChart;
