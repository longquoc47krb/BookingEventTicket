/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Pagination } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEventsForPagination } from "../../api/services/eventServices";
import AppDrawer from "../../components/common/drawer";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import Loading from "../../components/loading";
import { setPathName } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  dispatch(setPathName(window.location.pathname));
  const {
    data: eventsPaginated,
    status,
    isFetching,
  } = useFetchEventsForPagination(currentPage);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    navigate("/not-found");
    return null;
  } else {
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
          <div className="event-container-grid">
            {isFetching
              ? [...Array(6)].map((i) => (
                  <Skeleton width={360} height={260} key={i} />
                ))
              : eventsPaginated &&
                eventsPaginated.data.map((event, index) => (
                  <Event event={event} key={event.id} />
                ))}
          </div>
        </div>
        <div className="event-pagination">
          {isFetching ? null : (
            <Pagination
              current={currentPage + 1}
              onChange={onChange}
              total={eventsPaginated?.totalItems}
              pageSize={6}
            />
          )}
        </div>
        <Footer />
      </>
    );
  }
}
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
