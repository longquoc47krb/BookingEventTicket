import { Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiMoney } from "react-icons/bi";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useFindAllAccount,
  useGetAdminProfile,
} from "../api/services/adminServices";
import { filter } from "lodash";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { Greeting, formatter, nFormatter } from "../utils/utils";
import { ROLE } from "../utils/constants";
import PieChart from "../components/charts/PieChart";
import { useFetchEvents } from "../api/services/eventServices";
import EventsByCategoryChart from "../components/charts/EventsByCategoryChart";
import theme from "../shared/theme";
function AdminDashboard() {
  const user = useSelector(userInfoSelector);
  const { t } = useTranslation();
  const { data: AdminProfile, status: AdminStatus } = useGetAdminProfile(
    user.email
  );
  const { data: accounts, status: accountStatus } = useFindAllAccount();
  const { data: events, status: eventStatus } = useFetchEvents();

  // count number of events by province
  const hochiminhCount = filter(events, { province: "Thành phố Hồ Chí Minh" }).length;
  const hanoiCount = filter(events, { province: "Hà Nội" }).length;
  const lamdongCount = filter(events, { province: "Lâm Đồng" }).length;
  const otherCount = filter(events, function (o) {
    return (
      o.province !== "Thành phố Hồ Chí Minh" &&
      o.province !== "Hà Nội" &&
      o.province !== "Lâm Đồng"
    );
  }).length;
  const eventData = {
    labels: [
      t("province.hcm"),
      t("province.hn"),
      t("province.ld"),
      t("province.others"),
    ],
    datasets: [
      {
        data: [hochiminhCount, hanoiCount, lamdongCount, otherCount],
        backgroundColor: [
          theme.contrastColors[0],
          theme.contrastColors[1],
          theme.contrastColors[2],
          theme.contrastColors[3],
        ],
        hoverBackgroundColor: [
          theme.contrastColors[0],
          theme.contrastColors[1],
          theme.contrastColors[2],
          theme.contrastColors[3],
        ],
        borderColor: [
          theme.contrastColors[4],
          theme.contrastColors[4],
          theme.contrastColors[4],
          theme.contrastColors[4],
        ],
        borderWidth: 2,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Adjust the font size as desired
          },
        },
        position: "right",
      },
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          );
          const value = dataset.data[tooltipItem.index];
          const percentage = ((value / total) * 100).toFixed(2);
          return `${dataset.label}: ${percentage}%`;
        },
      },
    },
  };
  // count number of accounts by role
  const userCount = filter(accounts, { role: ROLE.Customer }).length;
  const organizerCount = filter(accounts, { role: ROLE.Organizer }).length;
  const adminCount = filter(accounts, { role: ROLE.Admin }).length;

  const accountData = {
    labels: [t("role.user"), t("role.organizer"), t("role.admin")],
    datasets: [
      {
        data: [userCount, organizerCount, adminCount],
        backgroundColor: [
          theme.contrastColors[0],
          theme.contrastColors[1],
          theme.contrastColors[2],
        ],
        hoverBackgroundColor: [
          theme.contrastColors[0],
          theme.contrastColors[1],
          theme.contrastColors[2],
        ],
        borderColor: [
          theme.contrastColors[4],
          theme.contrastColors[4],
          theme.contrastColors[4],
        ],
        borderWidth: 2,
      },
    ],
  };
  console.log({ accountData });
  const greeting = Greeting();
  if (AdminStatus === "success") {
    var earningData = [
      {
        icon: <BiMoney />,
        amount: `$${nFormatter(AdminProfile.usdbalance, 2)}`,
        rawAmount: formatter("USD").format(AdminProfile.usdbalance),
        title: t("usdbalance"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
      },
      {
        icon: <BiMoney />,
        amount: `${nFormatter(AdminProfile.vndbalance, 2)}`,
        rawAmount: formatter("VND").format(AdminProfile.vndbalance),
        title: t("vndbalance"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
      },
      {
        icon: <BiMoney />,
        amount: `$${nFormatter(AdminProfile.usdbalanceLock, 2)}`,
        rawAmount: formatter("USD").format(AdminProfile.usdbalanceLock),
        title: t("usdbalanceLock"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
      },
      {
        icon: <BiMoney />,
        amount: `${nFormatter(AdminProfile.vndbalanceLock, 2)}`,
        rawAmount: formatter("VND").format(AdminProfile.vndbalanceLock),
        title: t("vndbalanceLock"),
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
      },
    ];
  }
  return (
    <div className="m-8">
      <h1 className="px-8 mb-4">
        <p className="text-2xl text-gray-500 mb-2">{t(greeting)}</p>
        <p className="text-3xl text-[#1F3E82] font-bold">{user.name}</p>
      </h1>
      <div className="grid grid-cols-4 items-center justify-between gap-x-4 px-4">
        {AdminStatus === "success" &&
          earningData.map((item, index) => (
            <div
              key={index}
              className="card w-full dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 flex gap-x-4"
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
      <div className="m-4 grid grid-cols-2 gap-x-4">
        {accountStatus === "success" && (
          <PieChart
            data={accountData}
            title={t("title.account")}
            options={pieOptions}
          />
        )}
        {eventStatus === "success" && (
          <PieChart
            data={eventData}
            title={t("title.event")}
            options={pieOptions}
          />
        )}
      </div>
      <div className="p-4 card mx-4">
        <EventsByCategoryChart events={events} />
      </div>
    </div>
  );
}

export default AdminDashboard;
