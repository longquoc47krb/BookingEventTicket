/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BsCalendarEventFill,
  BsCartFill,
  BsCurrencyDollar,
  BsCaretDownFill,
  BsCaretUpFill,
} from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import product9 from "../data/product9.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { useGetStatisticByID } from "../api/services/organizationServices";
import { BiMoney } from "react-icons/bi";
import { t } from "i18next";
import { formatter, isNotEmpty, nFormatter } from "../utils/utils";
import { IoTicketSharp } from "react-icons/io5";
import moment from "moment";
import { useEffect } from "react";
import {
  eventStatsSelector,
  setEventStats,
  ticketStatsSelector,
  setTicketStats,
  orderStatsSelector,
  setOrderStats,
  revenueStatsSelector,
  setRevenueStats,
} from "../redux/slices/statisticSlice";
import { has } from "lodash";

const Overview = () => {
  const { currentColor, currentMode } = useStateContext();
  const user = useSelector(userInfoSelector);
  const eventStats = useSelector(eventStatsSelector);
  const ticketStats = useSelector(ticketStatsSelector);
  const orderStats = useSelector(orderStatsSelector);
  const revenueStats = useSelector(revenueStatsSelector);
  const { data, status } = useGetStatisticByID(user.id);
  const dispatch = useDispatch();
  console.log({ data });
  const today = moment().format("DD/MM/YYYY");
  const randomDay = moment("29/12/2022", "DD/MM/YYYY").format("DD/MM/YYYY");
  console.log("randomDay:", randomDay);
  useEffect(() => {
    if (status === "success") {
      dispatch(
        setEventStats({
          date: today,
          eventQuantity: data.eventSize,
        })
      );
      dispatch(
        setTicketStats({
          date: today,
          ticketQuantity: data.totalTicketSold,
        })
      );
      dispatch(
        setOrderStats({
          date: today,
          orderQuantity: data.totalOrder,
        })
      );
      dispatch(
        setRevenueStats({
          date: randomDay,
          revenue: 1500,
        })
      );
    }
  }, [data]);
  const handleVariability = (state, stateQuantity) => {
    if (isNotEmpty(state)) {
      if (has(state, "previous") && has(state.previous, stateQuantity)) {
        const variability =
          state.current[stateQuantity] - state.previous[stateQuantity];
        return variability < 0
          ? { status: "-", variability, color: "red" }
          : { status: "+", variability, color: "green" };
      }
      return { status: "", variability: "", color: "" };
    }
  };
  if (status === "success") {
    var earningData = [
      {
        icon: <BsCalendarEventFill />,
        amount: data.eventSize,
        variability: handleVariability(eventStats, "eventQuantity").variability,
        title: t("sider.event"),
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: handleVariability(eventStats, "eventQuantity").color,
      },
      {
        icon: <IoTicketSharp />,
        amount: data.totalTicketSold,
        variability: handleVariability(ticketStats, "ticketQuantity")
          .variability,
        title: t("ticketSold"),
        iconColor: "rgb(0, 148, 91)",
        iconBg: "#b2ebd5",
        pcColor: handleVariability(ticketStats, "ticketQuantity").color,
      },
      {
        icon: <BsCartFill />,
        amount: data.totalOrder,
        variability: handleVariability(orderStats, "orderQuantity").variability,
        title: t("sider.order"),
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
        pcColor: handleVariability(orderStats, "orderQuantity").color,
      },
      {
        icon: <BiMoney />,
        amount: `$${nFormatter(data.usdrevenue, 2)}`,
        variability: handleVariability(revenueStats, "revenue").variability
          ? `$${nFormatter(
              handleVariability(revenueStats, "revenue").variability,
              2
            )}`
          : "",
        title: t("revenue"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        pcColor: handleVariability(revenueStats, "revenue").color,
      },
    ];
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 justify-center px-8">
        {status === "success" &&
          earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 w-full dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl flex gap-x-4"
            >
              <button
                type="button"
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBg,
                }}
                className="text-3xl opacity-0.9 rounded-lg  p-4 hover:drop-shadow-xl w-[100px] h-[100px] flex justify-center items-center"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <div className="flex items-end gap-x-4">
                  <span className="text-4xl font-bold">{item.amount}</span>
                  <span
                    className={`text-sm ml-2`}
                    style={{ color: item.pcColor, display: "flex" }}
                  >
                    {item.pcColor === "red" ? (
                      <BsCaretDownFill />
                    ) : item.pcColor === "green" ? (
                      <BsCaretUpFill />
                    ) : null}
                    <span>{item.variability}</span>
                  </span>
                </div>
                <p className="text-xl font-semibold text-primary  mt-1">
                  {item.title}
                </p>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overview;
