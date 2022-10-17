/* eslint-disable react-hooks/exhaustive-deps */
import { Divider } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEventsForPagination } from "../../api/services/eventServices";
import AppDrawer from "../../components/common/drawer";
import { Pagination } from "antd";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import EmptyData from "../../components/empty";
import Event from "../../components/event";
import EventFilter from "../../components/filter";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import { setPathName } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
import { isEmpty, filterByDate, isNotEmpty } from "../../utils/utils";

function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  const { filteredEvents, loadingStatus, dateType, filter } =
    useUserFetchDataContext();
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  // if filter change, set current page equal 0 ( page 1)
  useEffect(() => {
    setCurrentPage(0);
  }, [filter, dateType]);
  console.log({ currentPage });
  const firstIndex = currentPage * 6;
  const lastIndex = currentPage * 6 + 6;
  return (
    <>
      <HelmetHeader title={t("pages.events")} content="Event Dashboard" />
      <Header showSearchBox={false} />
      <HeroBanner />
      <div className="event-container">
        <AppDrawer />
        <Divider style={{ color: "black", border: "gray" }}>
          <h1
            className={`flex justify-center text-[${theme.main}] font-bold text-3xl md:text-5xl`}
          >
            {t("event.list")}
          </h1>
        </Divider>
        <EventFilter />
        <div className="event-container-grid">
          {loadingStatus ? (
            [...Array(6)].map((i) => (
              <Skeleton width={360} height={260} key={i} />
            ))
          ) : isEmpty(filteredEvents) ? (
            <EmptyData />
          ) : isNotEmpty(filterByDate(dateType, filteredEvents)) ? (
            filterByDate(dateType, filteredEvents)
              .slice(firstIndex, lastIndex)
              .map((event, index) => <Event event={event} key={event.id} />)
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
      <div className="event-pagination">
        {loadingStatus ? null : filterByDate(dateType, filteredEvents).length >
          0 ? (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={filterByDate(dateType, filteredEvents).length}
            pageSize={6}
            defaultCurrent={1}
          />
        ) : null}
      </div>
      <Footer />
    </>
  );
}
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
