/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchCategories } from "../../api/services/categoryServices";
import {
  useFetchEvents,
  useFetchEventsByFilter,
} from "../../api/services/eventServices";
import AppDrawer from "../../components/common/drawer";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import EmptyData from "../../components/empty";
import Event from "../../components/event";
import EventFilter from "../../components/filter";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import {
  dateRangeSelector,
  filterSelector,
  setCategoryId,
} from "../../redux/slices/filterSlice";
import {
  filterByDate,
  filterData,
  isEmpty,
  isNotEmpty,
} from "../../utils/utils";
function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const [categoryParams, setCategoryParams] = useSearchParams();
  const filter = useSelector(filterSelector);
  const dateType = useSelector((state) => state.filter.filterByDateType);
  const dispatch = useDispatch();
  const { data: category } = useFetchCategories();
  const categoryId =
    category && categoryParams.get("category")
      ? category.filter((c) => c.name === categoryParams.get("category"))[0].id
      : null;
  const { data: allEvents, status: allEventsStatus } = useFetchEvents();
  const { data: filteredEvents, status: filteredEventsStatus } =
    useFetchEventsByFilter(filter);
  useEffect(() => {});
  // Select the date range
  const dateRange = useSelector(dateRangeSelector);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  // if filter change, set current page equal 0 ( page 1)
  useEffect(() => {
    setCurrentPage(0);
  }, [filter, dateType]);
  useEffect(() => {
    dispatch(setCategoryId(categoryId));
  }, []);
  const firstIndex = currentPage * 6;
  const lastIndex = currentPage * 6 + 6;

  // filter data by date

  return (
    <>
      <HelmetHeader title={t("pages.events")} content="Event Dashboard" />
      <Header showSearchBox={false} />
      <HeroBanner searchData={allEventsStatus === "success" && allEvents} />
      <div className="event-container">
        <AppDrawer />
        <SectionTitle>{t("event.list")}</SectionTitle>
        <EventFilter />
        <div className="event-container-grid">
          {filteredEventsStatus === "loading" ? (
            [...Array(6)].map((i) => (
              <Skeleton width={360} height={260} key={i} />
            ))
          ) : isEmpty(filterData(dateType, dateRange, filteredEvents)) ? (
            <EmptyData />
          ) : isNotEmpty(filterData) ? (
            filterData(dateType, dateRange, filteredEvents)
              .slice(firstIndex, lastIndex)
              .map((event, index) => <Event event={event} key={event.id} />)
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
      <div className="event-pagination">
        {!filterData(dateType, dateRange, filteredEvents) ? null : filterData(
            dateType,
            dateRange,
            filteredEvents
          ).length > 0 ? (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={filterData(dateType, dateRange, filteredEvents).length}
            pageSize={6}
            defaultCurrent={1}
          />
        ) : null}
      </div>
      <Footer />
    </>
  );
}
export default EventDashBoard;
