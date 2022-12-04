/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable quotes */
/* eslint-disable import/order */
import { Radio, Spin } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFindAllAccount } from "../api/services/adminServices";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import BreadCrumbs from "../components/BreadCrumb";
import Table from "../components/Table";
import { orderColumns, orderByAccountColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { ROLE } from "../utils/constants";

const Orders = () => {
  const user = useSelector(userInfoSelector);
  const [value, setValue] = useState("by-event");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  const { data: accounts, status: accountStatus } = useFindAllAccount();
  const { t } = useTranslation();
  const orderByEventData = events?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    ticketTotal: item.ticketTotal,
    ticketRemaining: item.ticketRemaining,
    date: item.startingDate,
    status: item.status,
  }));
  const orderByAccountData = accounts
    ?.filter((a) => a.role === ROLE.Customer)
    .map((item) => ({
      key: item.id,
      id: item.id,
      name: item.name,
      email: item.email,
      loginTime: item.loginTime,
    }));
  console.log({ orderByEventData });
  const breadcrumbs = [
    {
      link: "/orders",
      label: t("sider.order"),
    },
    {
      link: "/orders",
      label: t("sider.order"),
    },
    {
      link: "/orders",
      label: t("sider.order"),
    },
  ];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      {/* <BreadCrumbs
        breadcrumbs={breadcrumbs}
        className="absolute top-10 right-10"
      /> */}
      <Header category={t("sider.management")} title={t("sider.order")} />
      <div className="absolute top-[4.5rem] right-10">
        <Radio.Group onChange={onChange} value={value} defaultValue="all">
          <Radio value="by-event">{t("order.by-event")}</Radio>
          <Radio value="by-account">{t("order.by-account")}</Radio>
        </Radio.Group>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : value === "by-event" ? (
        <Table columns={orderColumns} dataSource={orderByEventData} />
      ) : (
        <Table
          columns={orderByAccountColumns}
          dataSource={orderByAccountData}
        />
      )}
    </div>
  );
};
export default Orders;
