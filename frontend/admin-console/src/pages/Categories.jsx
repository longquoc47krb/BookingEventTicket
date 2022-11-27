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
import { Modal } from "antd";
import { Spin } from "antd";
import { categoryGrid, contextMenuItems } from "../data/dummy";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../api/services/eventServices";
import { convertToYearMonthDayFormat } from "../utils/utils";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { useFetchCategories } from "../api/services/categoryServices";

const Categories = () => {
  const toolbarOptions = ["Search"];
  const user = useSelector(userInfoSelector);
  const { data: categories, status } = useFetchCategories();
  // console.log(events[0]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.category")} />
      <div className="flex w-full justify-end">
        <button
          className="p-2 bg-primary rounded-md mb-2 text-white text-lg"
          onClick={() => {
            showModal();
            setIsEdit(false);
          }}
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
          dataSource={categories}
          width="auto"
          allowPaging
          allowSorting
          allowExcelExport
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
          contextMenuItems={contextMenuItems}
        >
          <ColumnsDirective>
            {categoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar, Filter, Sort]} />
        </GridComponent>
      )}
      <Modal
        title={isEdit ? t("category.edit") : t("category.new")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            className="p-2 bg-primary text-white font-semibold min-w-[8rem] mr-4"
            onClick={handleOk}
          >
            {t("ok")}
          </button>,
          <button
            className="px-2 py-[6px] border-primary text-primary border-2 font-semibold min-w-[8rem]"
            onClick={handleCancel}
          >
            {t("cancel")}
          </button>,
        ]}
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </div>
  );
};
export default Categories;
