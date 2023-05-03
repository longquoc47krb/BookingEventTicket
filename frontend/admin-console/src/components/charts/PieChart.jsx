import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const { data, title } = props;

  return (
    <div className="p-4 rounded-md bg-white shadow-md block">
      <Pie data={data} />
      <h1 className="font-semibold text-xl mt-4">{title}</h1>
    </div>
  );
};
export default PieChart;
