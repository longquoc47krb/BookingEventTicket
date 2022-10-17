import React from "react";
import { BsCalendar2Date, BsFillGridFill, BsInfoCircle } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import {
  locationSelect,
  statusSelect,
  dateSelect,
} from "../../helpers/filter-data";
import theme from "../../shared/theme";
import { isNotEmpty } from "../../utils/utils";
import { Select } from "../common/select";

const EventFilter = () => {
  const { categories, successStatus } = useUserFetchDataContext();
  const categorySelect = [{ id: null, name: "category.all" }];
  for (let i in categories) {
    categorySelect.push({
      id: categories[i].id,
      name: categories[i].name,
    });
  }
  var DataMapping = [
    {
      icon: <IoLocationSharp color={theme.main} fontSize={20} />,
      data: locationSelect,
      type: "location",
      defaultValue: "all",
    },
    {
      icon: <BsFillGridFill color={theme.main} fontSize={20} />,
      data: categorySelect,
      type: "category",
      defaultValue: "category.all",
    },
    {
      icon: <BsCalendar2Date color={theme.main} fontSize={20} />,
      data: dateSelect,
      type: "date",
      defaultValue: "date.all",
    },
    {
      icon: <BsInfoCircle color={theme.main} fontSize={20} />,
      data: statusSelect,
      type: "status",
      defaultValue: "event.available",
    },
  ];

  return (
    <div className="filter-container">
      {successStatus &&
        DataMapping.map((item) => (
          <Select
            icon={item.icon}
            data={item.data}
            type={item.type}
            defaultValue={item.defaultValue}
            allowClear
          />
        ))}
    </div>
  );
};

export default EventFilter;
