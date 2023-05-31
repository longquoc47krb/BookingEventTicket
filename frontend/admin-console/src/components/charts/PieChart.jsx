import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const { data, title, options } = props;

  return (
    <div className="p-4 card shadow-md block">
      <h1 className="font-bold text-2xl text-center my-4">{title}</h1>
      <Pie data={data} options={options} />
    </div>
  );
};
export default PieChart;
