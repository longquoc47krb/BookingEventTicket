/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable quotes */
/* eslint-disable import/order */
import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Search,
  Page,
  Toolbar,
  ExcelExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Spin } from "antd";
import { ordersData, contextMenuItems, orderGrid } from "../data/dummy";
import { Header } from "../components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { t } from "i18next";
import BreadCrumbs from "../components/BreadCrumb";

const Orders = () => {
  const toolbarOptions = ["Search"];
  const user = useSelector(userInfoSelector);
  const editing = { allowDeleting: true, allowEditing: true };
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  const { t } = useTranslation();
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
      <BreadCrumbs
        breadcrumbs={breadcrumbs}
        className="absolute top-10 right-10"
      />
      <Header category={t("sider.management")} title={t("sider.order")} />
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
          editSettings={editing}
          contextMenuItems={contextMenuItems}
        >
          <ColumnsDirective>
            {orderGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Search,
              Page,
              Toolbar,
              Filter,
              Sort,
              ContextMenu,
              ExcelExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};
export default Orders;
