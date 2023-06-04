import React from "react";
import { useTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EventsByCategoryChart = ({ events }) => {
  const { t } = useTranslation();
  // Prepare data for the chart
  const categories = [];
  const eventCounts = [];

  // Count the number of events in each category
  events?.forEach((event) => {
    event.eventCategoryList.forEach((category) => {
      const index = categories.indexOf(t(category.name));
      if (index !== -1) {
        eventCounts[index]++;
      } else {
        categories.push(t(category.name));
        eventCounts.push(1);
      }
    });
  });

  // Define the chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Event Count",
        data: eventCounts,
        backgroundColor: "#1F3E82",
      },
    ],
  };

  return (
    <div className="px-4">
      <h1 className="font-bold text-xl">{t("eventsByCategory")}</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default EventsByCategoryChart;
