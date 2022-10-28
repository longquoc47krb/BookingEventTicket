/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchCategories } from "../../api/services/categoryServices";
import AppDrawer from "../../components/common/drawer";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import EmptyData from "../../components/empty";
import Event from "../../components/event";
import EventFilter from "../../components/filter";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import {
  dateRangeSelector,
  setCategoryId,
} from "../../redux/slices/filterSlice";
import { filterByDate, isEmpty, isNotEmpty } from "../../utils/utils";
function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const [categoryParams, setCategoryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: category, status } = useFetchCategories();
  const categoryId = categoryParams.get("category")
    ? category.filter((c) => c.name === categoryParams.get("category"))[0].id
    : null;
  const { filteredEvents, loadingStatus, dateType, filter } =
    useUserFetchDataContext();
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

  const filterData =
    dateType === "date-range"
      ? filterByDate(dateType, filteredEvents, {
          start: dateRange.start,
          end: dateRange.end,
          isAvailable: dateRange.isAvailable,
        })
      : filterByDate(dateType, filteredEvents);
  return (
    <>
      <HelmetHeader title={t("pages.events")} content="Event Dashboard" />
      <Header showSearchBox={false} />
      <HeroBanner />
      <div className="event-container">
        <AppDrawer />
        <SectionTitle>{t("event.list")}</SectionTitle>
        <EventFilter />
        <div className="event-container-grid">
          {loadingStatus ? (
            [...Array(6)].map((i) => (
              <Skeleton width={360} height={260} key={i} />
            ))
          ) : isEmpty(filteredEvents) ? (
            <EmptyData />
          ) : isNotEmpty(filterData) ? (
            filterData
              .slice(firstIndex, lastIndex)
              .map((event, index) => <Event event={event} key={event.id} />)
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
      <div className="event-pagination">
        {loadingStatus ? null : filterData.length > 0 ? (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={filterData.length}
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
