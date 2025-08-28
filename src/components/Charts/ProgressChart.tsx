import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ProgressChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: any;
  title: string;
  options?: any;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ type, data, title, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
    ...options,
  };

  const chartComponents = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
  };

  const ChartComponent = chartComponents[type];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <ChartComponent data={data} options={defaultOptions} />
    </div>
  );
};

export default ProgressChart;