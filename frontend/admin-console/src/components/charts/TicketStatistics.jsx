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
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  getDailyTicketStatistics,
  getLastFourWeeksTicketStatistics,
  getMonthlyTicketStatistics,
} from "../../api/services/orderServices";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
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
export function TicketStatistics({ organizationEmail, chartName }) {
  const [period, setPeriod] = useState("daily");
  const handlePeriodChange = async (event) => {
    setPeriod(event.target.value);
    // Reset the start and end dates when period changes
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t(chartName),
      },
    },
  };
  const {
    isLoading,
    data: ticketStatistics,
    refetch,
  } = useQuery(["ticketStatistics", organizationEmail, period], async () => {
    switch (period) {
      case "daily":
        return getDailyTicketStatistics(organizationEmail);
      case "weekly":
        return getLastFourWeeksTicketStatistics(organizationEmail);
      case "monthly":
        return getMonthlyTicketStatistics(organizationEmail);
      default:
        return null;
    }
  });
  useEffect(() => {
    refetch();
  }, [organizationEmail, period, refetch]);
  return (
    <div className="min-h-590 mt-4 mx-8 p-6 sm:px-6 lg:px-8 card relative">
      <h2 className="text-xl font-bold mb-4">{t(chartName)}</h2>
      <div className="flex flex-col sm:flex-row items-center">
        <label htmlFor="period" className="mr-2 font-medium">
          {t("stats.period")}
        </label>
        <select
          id="period"
          className="rounded-md px-3 py-1 mb-2 sm:mb-0"
          value={period}
          onChange={handlePeriodChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      {/* {period === "custom" && (
        <div className="flex flex-col sm:flex-row items-center">
          <label htmlFor="startDate" className="mr-2 font-medium">
            Start Date:
          </label>
          <DatePicker
            className="ml-2 py-2 px-3 border rounded"
            selected={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor="endDate" className="mr-2 font-medium">
            End Date:
          </label>
          <DatePicker
            className="ml-2 py-2 px-3 border rounded"
            selected={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      )} */}
      {isLoading ? (
        <div className="inset-0 absolute z-50 flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="w-full relative">
          {ticketStatistics && (
            <Bar
              data={{
                labels:
                  ticketStatistics.map((dataPoint) => dataPoint.date) ?? [],
                datasets: [
                  {
                    label: t("stats.numTickets"),
                    data:
                      ticketStatistics.map(
                        (dataPoint) => dataPoint.numberTickets
                      ) ?? [],
                    backgroundColor: "#1F3E82",
                  },
                ],
              }}
              options={options}
            />
          )}
        </div>
      )}
    </div>
  );
}
