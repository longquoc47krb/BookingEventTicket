import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/vi";
import { titleCase } from "../../utils/utils";
function Calendar(props) {
  const { className, calendar } = props;
  const dateFormat = (moment.defaultFormat = "DD/MM/YYYY");
  var language = localStorage.getItem("i18nextLng");
  if (language === "en") {
    moment.locale("en");
  } else {
    moment.locale("vi");
  }
  const calendarObj = {
    dayOfWeek: moment(calendar, dateFormat).format("dddd"),
    day: moment(calendar, dateFormat).format("D"),
    month: moment(calendar, dateFormat).format("MMMM"),
  };
  return (
    <div className={`calendar-container ${className}`}>
      <div className="calendar-upper">
        <h1 className="text-[0.8rem] text-white calendar-month">
          {titleCase(calendarObj.month)}
        </h1>
      </div>
      <h1 className="font-bold calendar-day">{calendarObj.day}</h1>
      <h1 className="text-[0.7rem] font-bold calendar-dayOfWeek">
        {titleCase(calendarObj.dayOfWeek)}
      </h1>
    </div>
  );
}
Calendar.propTypes = {
  calendar: PropTypes.string.isRequired,
};
Calendar.defaultProps = {
  calendar: moment(),
};
export default Calendar;
