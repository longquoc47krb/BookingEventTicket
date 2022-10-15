import React from "react";
import { BsCalendar2Date, BsFillGridFill, BsInfoCircle } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import { locationSelect } from "../../helpers/filter-data";
import theme from "../../shared/theme";
import { Select } from "../common/select";

const EventFilter = () => {
  const { categories } = useUserFetchDataContext();
  var DataMapping = [
    {
      icon: <IoLocationSharp color={theme.main} fontSize={20} />,
      data: locationSelect,
    },
    {
      icon: <BsFillGridFill color={theme.main} fontSize={20} />,
      data: categories,
    },
    {
      icon: <BsCalendar2Date color={theme.main} fontSize={20} />,
      data: [],
    },
    {
      icon: <BsInfoCircle color={theme.main} fontSize={20} />,
      data: [],
    },
  ];

  return (
    <div className="filter-container">
      {DataMapping.map((item) => (
        <Select icon={item.icon} data={item.data} />
      ))}
    </div>
  );
};

export default EventFilter;
