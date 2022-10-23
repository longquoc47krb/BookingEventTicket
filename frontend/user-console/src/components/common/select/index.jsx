import { Select as AntSelect } from "antd";
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
export function Select(props) {
  const { data, icon, type, defaultValue } = props;
  const { t } = useTranslation();
  const keys = isNotEmpty(data) && Object.keys(Object.assign({}, ...data));
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = useSelector((state) => state.filter.filter);
  const filterByDateType = useSelector(
    (state) => state.filter.filterByDateType
  );
  function handleValue(value) {
    if (type === "location") return dispatch(setProvince(value));
    if (type === "category") return dispatch(setCategoryId(value));

    if (type === "status") return dispatch(setStatus(value));

    return dispatch(setDateType(value));
  }
  return (
    <div className="select-container">
      {icon}
      <AntSelect
        style={{
          width: "100%",
        }}
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
        {data?.map((item, index) => (
          <AntSelect.Option key={index} value={item[keys[0]]}>
            {t(item[keys[1]])}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </div>
  );
}