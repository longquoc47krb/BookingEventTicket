import { Modal, Spin } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../api/services/categoryServices";
import { Header } from "../components";
import Table from "../components/Table";
import { categoryColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
const Categories = () => {
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
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table columns={categoryColumns} dataSource={categories} />
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
