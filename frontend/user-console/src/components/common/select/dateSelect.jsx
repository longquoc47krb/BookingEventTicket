import { Button, Modal, Select as AntSelect } from "antd";
import { useTranslation } from "react-i18next";
import { BsCalendarDateFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../../shared/theme";
import { DatePicker } from "antd";
import moment from "moment";
import constants from "../../../utils/constants";
import { setDate, filterSelector } from "../../../redux/slices/filterSlice";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { PATTERNS } = constants;
const data = {
  icon: <BsCalendarDateFill color={theme.main} fontSize={20} />,
  type: "date",
  defaultValue: null,
};
export function DateSelect(props) {
  const filter = useSelector(filterSelector);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState([]);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDateChange = (dates) => {
    setSelectedRange(dates);
  };
  const handleApply = () => {
    console.log("Selected range:", selectedRange);
    const firstDate = selectedRange[0].format("DD/MM/YYYY");
    const secondDate = selectedRange[1].format("DD/MM/YYYY");
    dispatch(setDate("range:" + firstDate + ":" + secondDate));
    setModalVisible(false);
  };
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="select-container">
      {data.icon}
      <AntSelect
        style={{
          width: "100%",
        }}
        defaultValue={data.defaultValue}
        bordered={false}
        value={filter.date}
        onChange={(value) => dispatch(setDate(value))}
      >
        <AntSelect.Option key={1} value={null}>
          {t("date.all")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"this_week"}>
          {t("date.this-week")}
        </AntSelect.Option>
        <AntSelect.Option key={1} value={"this_month"}>
          {t("date.this-month")}
        </AntSelect.Option>
        <AntSelect.Option key={1}>
          <button onClick={handleOpenModal}>{t("date.range")}</button>
        </AntSelect.Option>
      </AntSelect>
      <Modal title={t("date.range")} visible={modalVisible} footer={null}>
        <RangePicker
          value={selectedRange}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
        <button
          key="submit"
          className="primary-button mt-4"
          onClick={handleApply}
          style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
        >
          Submit
        </button>
      </Modal>
    </div>
  );
}
