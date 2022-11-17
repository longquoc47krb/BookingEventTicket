import React, { useState } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { Spin } from "antd";
import { eventGrid, contextMenuItems } from "../data/dummy";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../api/services/eventServices";
import { convertToYearMonthDayFormat } from "../utils/utils";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";

const Events = () => {
  const toolbarOptions = ["Search"];
  const user = useSelector(userInfoSelector);
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  // console.log(events[0]);
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <GridComponent
          dataSource={events}
          width="auto"
          allowPaging
          allowSorting
          allowExcelExport
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
          contextMenuItems={contextMenuItems}
        >
          <ColumnsDirective>
            {eventGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar, Filter, Sort]} />
        </GridComponent>
      )}
    </div>
  );
};
export default Events;
