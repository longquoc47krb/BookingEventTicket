import { Select as AntSelect } from "antd";
import { useTranslation } from "react-i18next";
import { BsCalendarDateFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../../shared/theme";
import { DatePicker } from "antd";
import moment from "moment";
import constants from "../../../utils/constants";
import {
  setDateType,
  setEndDate,
  setStartDate,
} from "../../../redux/slices/filterSlice";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { PATTERNS } = constants;
const data = {
  icon: <BsCalendarDateFill color={theme.main} fontSize={20} />,
  type: "date",
  defaultValue: null,
};
export function DateSelect(props) {
  const filterByDateType = useSelector(
    (state) => state.filter.filterByDateType
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  return (
    <div className="select-container">
      {data.icon}
      <AntSelect
        style={{
          width: "100%",
        }}
        defaultValue={data.defaultValue}
        bordered={false}
        value={filterByDateType}
        onChange={(value) => dispatch(setDateType(value))}
      >
        <AntSelect.Option key={1} value={null}>
          {t("date.all")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"tomorrow"}>
          {t("date.tomorrow")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"this-week"}>
          {t("date.this-week")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"this-month"}>
          {t("date.this-month")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"date-range"}>
          <div className="flex flex-col">
            <RangePicker
              format={PATTERNS.DATE_FORMAT}
              onChange={(dates) => {
                dispatch(
                  setStartDate(moment(dates[0]).format(PATTERNS.DATE_FORMAT))
                );
                dispatch(
                  setEndDate(moment(dates[1]).format(PATTERNS.DATE_FORMAT))
                );
              }}
            />
          </div>
        </AntSelect.Option>
      </AntSelect>
    </div>
  );
}
