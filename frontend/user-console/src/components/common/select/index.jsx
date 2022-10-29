import { Select as AntSelect } from "antd";
import { orderBy } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setDateType,
  setProvince,
  setStatus,
} from "../../../redux/slices/filterSlice";
import { isNotEmpty } from "../../../utils/utils";
import { useUserFetchDataContext } from "../../../context/UserFetchDataContext";
export function Select(props) {
  const { data, icon, type, defaultValue } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const keys = isNotEmpty(data) && Object.keys(Object.assign({}, ...data));
  const { categories } = useUserFetchDataContext();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);
  const filterByDateType = useSelector(
    (state) => state.filter.filterByDateType
  );
  function handleValue(value) {
    if (type === "location") return dispatch(setProvince(value));
    if (type === "category") {
      navigate(
        `/events?category=${categories.filter((c) => c.id === value)[0].name}`
      );
      return dispatch(setCategoryId(value));
    }

    if (type === "status") return dispatch(setStatus(value));

    return dispatch(setDateType(value));
  }
  const validatedData = orderBy(
    data,
    [(user) => user[keys[1]].toLowerCase()],
    ["asc"]
  );
  console.log(">>defaultValue:", defaultValue);
  return (
    <div className="select-container">
      {icon}
      <AntSelect
        style={{
          width: "100%",
        }}
        defaultValue={defaultValue}
        bordered={false}
        value={
          type === "location"
            ? filter.province
            : type === "category"
            ? filter.categoryId
            : type === "status"
            ? filter.status
            : filterByDateType
        }
        onChange={handleValue}
      >
        {validatedData?.map((item, index) => (
          <AntSelect.Option key={index} value={item[keys[0]]}>
            {t(item[keys[1]])}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </div>
  );
}
