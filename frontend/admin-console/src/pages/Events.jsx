import { Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import Table from "../components/Table";
import { eventColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
const Events = () => {
  const toolbarOptions = ["Search"];
  const user = useSelector(userInfoSelector);
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  // console.log(events[0]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const eventData = events?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    categories: item.eventCategoryList,
    date: item.startingDate,
    status: item.status,
  }));
  console.log({ events, eventData });
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.event")} />
      <div className="flex w-full justify-end">
        <button
          className="p-2 bg-primary rounded-md mb-2 text-white text-lg"
          onClick={() => navigate("/event/create")}
        >
          {t("event.create")}
        </button>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table columns={eventColumns} dataSource={eventData} />
      )}
    </div>
  );
};
export default Events;
