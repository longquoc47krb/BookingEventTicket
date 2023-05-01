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
export function OrderStatistics({ organizationEmail, chartName }) {
  const [period, setPeriod] = useState("daily");
  const [ticketStatistics, setTicketStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    async function fetchTicketStatistics(period) {
      let response = [];

      switch (period) {
        case "daily":
          setLoading(true);
          response = await getDailyTicketStatistics(organizationEmail);
          setTicketStatistics(response);
          setLoading(false);
          break;
        case "weekly":
          setLoading(true);
          response = await getLastFourWeeksTicketStatistics(organizationEmail);
          setTicketStatistics(response);
          setLoading(false);
          break;
        case "monthly":
          setLoading(true);
          response = await getMonthlyTicketStatistics(organizationEmail);
          setTicketStatistics(response);
          setLoading(false);
          break;
        case "yearly":
          // code block to be executed if expression matches value2
          break;
        default:
          break;
        // code block to be executed if none of the cases match
      }
    }
    fetchTicketStatistics(period);
  }, [organizationEmail, period]);

  return (
    <div className="w-[70vw] min-h-590 mt-4 mx-8 py-4 sm:px-6 lg:px-8 bg-white rounded-md relative">
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
          <option value="yearly">Yearly</option>
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
      {loading ? (
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
