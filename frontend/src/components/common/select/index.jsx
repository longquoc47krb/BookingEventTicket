import { useTranslation } from "react-i18next";
import { isNotEmpty } from "../../../utils/utils";
import { Select as AntSelect } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setProvince,
  setStatus,
  setDateType,
} from "../../../redux/slices/filterSlice";
export function Select(props) {
  const { data, icon, type, defaultValue } = props;
  const { t } = useTranslation();
  const keys = isNotEmpty(data) && Object.keys(Object.assign({}, ...data));
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);
  const filterByDateType = useSelector(
    (state) => state.filter.filterByDateType
  );
  useEffect(() => {
    if (type === "location") {
      dispatch(setProvince(value));
    } else if (type === "category") {
      dispatch(setCategoryId(value));
    } else if (type === "status") {
      dispatch(setStatus(value));
    } else {
      dispatch(setDateType(value));
    }
  }, [type, value, dispatch, defaultValue]);
  return (
    <div className="select-container">
      {icon}
      <AntSelect
        style={{
          width: "100%",
        }}
        bordered={false}
        defaultValue={value}
        value={
          type === "location"
            ? filter.province
            : type === "category"
            ? filter.categoryId
            : type === "status"
            ? filter.status
            : filterByDateType
        }
        onChange={(value) => {
          type === "location"
            ? dispatch(setProvince(value))
            : type === "category"
            ? dispatch(setCategoryId(value))
            : type === "status"
            ? dispatch(setStatus(value))
            : dispatch(setDateType(value));
        }}
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
