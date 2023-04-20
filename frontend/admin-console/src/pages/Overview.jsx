/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { Spin } from "antd";
import { BiMoney } from "react-icons/bi";
import {
  BsCalendarEventFill,
  BsCaretDownFill,
  BsCaretUpFill,
  BsCartFill,
} from "react-icons/bs";
import { IoTicketSharp } from "react-icons/io5";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetStatisticByID } from "../api/services/organizationServices";
import { OrderStatistics } from "../components/charts/OrderStatistics";
import { roleSelector, userInfoSelector } from "../redux/slices/accountSlice";
import {
  setEventStats,
  setOrderStats,
  setRevenueStats,
  setTicketStats,
} from "../redux/slices/statisticSlice";
import { Greeting, formatter, nFormatter } from "../utils/utils";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const user = useSelector(userInfoSelector);
  const role = useSelector(roleSelector);
  const { data, status } = useGetStatisticByID(user.email);
  const dispatch = useDispatch();
  const today = moment().format("DD/MM/YYYY");
  const randomDay = moment("29/12/2022", "DD/MM/YYYY").format("DD/MM/YYYY");
  const greeting = Greeting();
  const { t } = useTranslation();
  var adminData = [];
  useEffect(() => {
    if (status === "success") {
      dispatch(
        setEventStats({
          date: today,
          eventQuantity: data.numEvents,
        })
      );
      dispatch(
        setTicketStats({
          date: today,
          ticketQuantity: data.numTickets,
        })
      );
      dispatch(
        setOrderStats({
          date: today,
          orderQuantity: data.numOrders,
        })
      );
      dispatch(
        setRevenueStats({
          date: randomDay,
          revenue: data.revenue,
        })
      );
    }
  }, [data]);
  const handleVariability = (variability, stateQuantity) => {
    if (variability < 0) {
      return { status: "-", variability, color: "red" };
    } else if (variability > 0) {
      return { status: "+", variability, color: "green" };
    } else {
      return { status: "", variability: "", color: "" };
    }
  };
  if (status === "success") {
    var earningData = [
      {
        icon: <BsCalendarEventFill />,
        amount: data.numEvents,
        rawAmount: data.numEvents,
        variability: handleVariability(data.eventsSizeChange, "eventQuantity")
          .variability,
        title: t("sider.event"),
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: handleVariability(data.eventsSizeChange, "eventQuantity")
          .color,
      },
      {
        icon: <IoTicketSharp />,
        amount: data.numTickets,
        rawAmount: data.numTickets,
        // variability: handleVariability(data.eventsSizeChange, "ticketQuantity")
        //   .variability,
        title: t("ticketSold"),
        iconColor: "rgb(0, 148, 91)",
        iconBg: "#b2ebd5",
        // pcColor: handleVariability(ticketStats, "ticketQuantity").color,
      },
      {
        icon: <BsCartFill />,
        amount: data.numOrders,
        rawAmount: data.numOrders,
        variability: handleVariability(data.ordersSizeChange, "orderQuantity")
          .variability,
        title: t("sider.order"),
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
        pcColor: handleVariability(data.ordersSizeChange, "orderQuantity")
          .color,
      },
      {
        icon: <BiMoney />,
        amount: `$${nFormatter(data.usdRevenue, 2)}`,
        rawAmount: formatter("USD").format(data.usdRevenue),
        // variability: handleVariability(revenueStats, "revenue").variability
        //   ? `$${nFormatter(
        //       handleVariability(revenueStats, "revenue").variability,
        //       2
        //     )}`
        //   : "",
        title: t("usdRevenue"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        // pcColor: handleVariability(revenueStats, "revenue").color,
      },
      {
        icon: <BiMoney />,
        amount: `${nFormatter(data.vndRevenue, 2)}`,
        rawAmount: formatter("VND").format(data.vndRevenue),
        // variability: handleVariability(revenueStats, "revenue").variability
        //   ? `$${nFormatter(
        //       handleVariability(revenueStats, "revenue").variability,
        //       2
        //     )}`
        //   : "",
        title: t("vndRevenue"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        // pcColor: handleVariability(revenueStats, "revenue").color,
      },
    ];
  }
  return (
    <div className="mt-8">
      <h1 className="px-8 mb-4">
        <p className="text-2xl text-gray-500 mb-2">{t(greeting)}</p>
        <p className="text-3xl text-[#1F3E82] font-bold">{user.name}</p>
      </h1>
      {role !== "ROLE_ADMIN" ? (
        <div className="flex flex-wrap items-center gap-x-4 px-8">
          {status === "success" &&
            earningData.map((item) => (
              <div
                key={item.title}
                className="bg-white w-[13vw] dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl flex gap-x-4"
              >
                <p className="mt-3">
                  <div className="flex items-end gap-x-4">
                    <Tooltip
                      placement="rightBottom"
                      title={
                        <span className="text-2xl font-bold">
                          {item.rawAmount}
                        </span>
                      }
                    >
                      <span className="text-3xl font-bold">{item.amount}</span>
                    </Tooltip>
                    <span
                      className="text-md ml-2 flex"
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
                  <p className="text-sm font-semibold text-primary  mt-1">
                    {item.title}
                  </p>
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-4 px-8">
          {status === "success" &&
            adminData.map((item) => (
              <div
                key={item.title}
                className="bg-white w-[13vw] dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl flex gap-x-4"
              >
                <p className="mt-3">
                  <div className="flex items-end gap-x-4">
                    <Tooltip
                      placement="rightBottom"
                      title={
                        <span className="text-2xl font-bold">
                          {item.rawAmount}
                        </span>
                      }
                    >
                      <span className="text-3xl font-bold">{item.amount}</span>
                    </Tooltip>
                    {/* <span
                      className="text-md ml-2 flex"
                      style={{ color: item.pcColor, display: "flex" }}
                    >
                      {item.pcColor === "red" ? (
                        <BsCaretDownFill />
                      ) : item.pcColor === "green" ? (
                        <BsCaretUpFill />
                      ) : null}
                      <span>{item.variability}</span>
                    </span> */}
                  </div>
                  <p className="text-sm font-semibold text-primary  mt-1">
                    {item.title}
                  </p>
                </p>
              </div>
            ))}
        </div>
      )}
      {role !== "ROLE_ADMIN" && (
        <OrderStatistics
          organizationEmail={user.email}
          chartName="stats.ticket"
        />
      )}
    </div>
  );
};

export default Overview;
