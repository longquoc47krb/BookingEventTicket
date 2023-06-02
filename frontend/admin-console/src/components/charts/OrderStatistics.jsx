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
import { Line } from "react-chartjs-2";
import {
  getDailyOrderStatistics,
  getLastFourWeeksOrderStatistics,
  getMonthlyOrderStatistics,
} from "../../api/services/orderServices";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import theme from "../../shared/theme";
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
  const [currency, setCurrency] = useState("VND");
  const handlePeriodChange = async (event) => {
    setPeriod(event.target.value);
    // Reset the start and end dates when period changes
  };
  const handleCurrencyChange = async (event) => {
    setCurrency(event.target.value);
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        ticks: {
          callback: (value) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            }
            return value;
          },
        },
      },
    },
  };
  const {
    isLoading,
    data: orderStatistics,
    refetch,
  } = useQuery(["orderStatistics", organizationEmail, period], async () => {
    switch (period) {
      case "daily":
        return getDailyOrderStatistics(organizationEmail);
      case "weekly":
        return getLastFourWeeksOrderStatistics(organizationEmail);
      case "monthly":
        return getMonthlyOrderStatistics(organizationEmail);
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
        <label htmlFor="currency" className="mr-2 font-medium  ml-4">
          {t("event.currency")}
        </label>
        <select
          className="rounded-md px-3 py-1 mb-2 sm:mb-0"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="VND">VND</option>
        </select>
      </div>
      {isLoading ? (
        <div className="inset-0 absolute z-50 flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="w-full relative">
          {orderStatistics && (
            <div>
              {currency === "VND" ? (
                <Line
                  data={{
                    labels:
                      orderStatistics.map((dataPoint) => dataPoint.date) ?? [],
                    datasets: [
                      {
                        label: "VND",
                        data:
                          orderStatistics.map(
                            (dataPoint) => dataPoint.orderTotalPriceByVND
                          ) ?? [],
                        borderColor: theme.main,
                        fill: true,
                      },
                    ],
                  }}
                  options={options}
                />
              ) : (
                <Line
                  data={{
                    labels:
                      orderStatistics.map((dataPoint) => dataPoint.date) ?? [],
                    datasets: [
                      {
                        label: "USD",
                        data:
                          orderStatistics.map(
                            (dataPoint) => dataPoint.orderTotalPriceByUSD
                          ) ?? [],
                        borderColor: "red",
                        fill: false,
                      },
                    ],
                  }}
                  options={options}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
