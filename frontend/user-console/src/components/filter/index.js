import React from "react";
import { BsFillGridFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { useFetchCategories } from "../../api/services/categoryServices";
import { locationSelect, statusSelect } from "../../helpers/filter-data";
import theme from "../../shared/theme";
import { Select } from "../common/select";
import { DateSelect } from "../common/select/dateSelect";
const EventFilter = () => {
  const { data: categories, status } = useFetchCategories();
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
      icon: <BsFillInfoCircleFill color={theme.main} fontSize={20} />,
      data: statusSelect,
      type: "status",
      defaultValue: "event.available",
    },
  ];

  return (
    <div className="filter-container">
      <>
        <Select
          icon={DataMapping[0].icon}
          data={DataMapping[0].data}
          type={DataMapping[0].type}
          defaultValue={DataMapping[0].defaultValue}
        />
        <Select
          icon={DataMapping[1].icon}
          data={DataMapping[1].data}
          type={DataMapping[1].type}
          defaultValue={DataMapping[1].defaultValue}
        />
        <DateSelect />
        <Select
          icon={DataMapping[2].icon}
          data={DataMapping[2].data}
          type={DataMapping[2].type}
          defaultValue={DataMapping[2].defaultValue}
        />
      </>
    </div>
  );
};

export default EventFilter;
