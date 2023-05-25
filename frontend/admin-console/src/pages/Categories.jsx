import { Modal } from "antd";
import { filter, sortBy, some } from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategories } from "../api/services/categoryServices";
import { useFetchEvents } from "../api/services/eventServices";
import { Header } from "../components";
import CategoryItem from "../components/CategoryItem";
import Table from "../components/Table";
import EventsByCategoryChart from "../components/charts/EventsByCategoryChart";
import { eventColumns } from "../data/dummy";
import {
  setShowCategoryModal,
  showCategorySelection,
} from "../redux/slices/categorySlice";

const Categories = () => {
  const { data: categories, status } = useFetchCategories();
  const [category, setCategory] = useState(null);
  const { data: events, status: eventStatus } = useFetchEvents();
  const eventData = events?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    categories: item.eventCategoryList,
    date: item.startingDate,
    status: item.status,
  }));
  console.log({ eventData });
  const open = useSelector(showCategorySelection);
  const [eventsByCategory, setEventsByCategory] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const findEventsByCategoryName = (events, categoryName) =>
    filter(events, (event) => some(event.categories, { name: categoryName }));

  useEffect(() => {
    const eventsByCat = findEventsByCategoryName(eventData, category?.name);
    setEventsByCategory(eventsByCat);
    console.log({ eventsByCat });
  }, [category]);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.category")} />
      <div className="w-full h-full grid items-center justify-center grid-cols-2">
        {categories?.map((category, index) => (
          <CategoryItem
            category={category}
            icon={category.name}
            onClick={() => {
              setCategory(category);
              dispatch(setShowCategoryModal(true));
            }}
          />
        ))}
      </div>
      <Modal
        title={t(category?.name)}
        visible={open}
        width={"80vw"}
        closable={false}
        onCancel={() => dispatch(setShowCategoryModal(false))}
        onOk={() => dispatch(setShowCategoryModal(false))}
      >
        <Table
          dataSource={
            eventStatus === "success" &&
            sortBy(eventsByCategory, (event) => {
              if (event.status === "event.available") {
                return 1;
              } else if (event.status === "event.completed") {
                return 2;
              }
              // Handle other cases if needed
            })
          }
          columns={eventColumns}
        />
      </Modal>
      {/* <EventChart events={events} /> */}
      <hr className="my-4" />
      <EventsByCategoryChart events={events} />
    </div>
  );
};
export default Categories;
