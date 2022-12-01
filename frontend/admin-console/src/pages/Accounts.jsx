import React, { useState } from "react";
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
import { accountGrid, contextMenuItems } from "../data/dummy";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../api/services/eventServices";
import { convertToYearMonthDayFormat } from "../utils/utils";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slices/accountSlice";
import {
  useFetchAllOrganizers,
  useFetchEventsByOrgID,
} from "../api/services/organizationServices";
import Link from "@mui/material/Link";

const Accounts = () => {
  const toolbarOptions = ["Search"];
  const user = useSelector(userInfoSelector);
  const { data: organizers, status } = useFetchAllOrganizers();
  const editing = { allowDeleting: true, allowEditing: true };
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category={t("sider.management")} title={t("sider.account")} />
      {/* <div className="flex w-full justify-end">
        <button className="p-2 bg-primary rounded-md mb-2 text-white text-lg">
          {t("account.export-excel")}
        </button>
      </div> */}
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <GridComponent
          dataSource={organizers}
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
            {accountGrid.map((item, index) => (
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
export default Accounts;
