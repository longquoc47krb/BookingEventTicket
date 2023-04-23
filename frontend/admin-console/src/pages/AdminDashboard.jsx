import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleSelector, userInfoSelector } from "../redux/slices/accountSlice";
import { useGetStatisticByID } from "../api/services/organizationServices";
import moment from "moment";
import { Greeting } from "../utils/utils";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";

function AdminDashboard() {
  const user = useSelector(userInfoSelector);
  const role = useSelector(roleSelector);
  const { data, status } = useGetStatisticByID(user.email);
  const dispatch = useDispatch();
  const today = moment().format("DD/MM/YYYY");
  const randomDay = moment("29/12/2022", "DD/MM/YYYY").format("DD/MM/YYYY");
  const greeting = Greeting();
  const { t } = useTranslation();
  var adminData = [];
  const handleVariability = (variability, stateQuantity) => {
    if (variability < 0) {
      return { status: "-", variability, color: "red" };
    } else if (variability > 0) {
      return { status: "+", variability, color: "green" };
    } else {
      return { status: "", variability: "", color: "" };
    }
  };
  return (
    <div className="mt-8">
      <h1 className="px-8 mb-4">
        <p className="text-2xl text-gray-500 mb-2">{t(greeting)}</p>
        <p className="text-3xl text-[#1F3E82] font-bold">{user.name}</p>
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 px-8"></div>
    </div>
  );
}

export default AdminDashboard;
