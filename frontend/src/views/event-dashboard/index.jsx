/* eslint-disable react-hooks/exhaustive-deps */
import { Divider } from "antd";
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
import EmptyData from "../../components/empty";
import Event from "../../components/event";
import EventFilter from "../../components/filter";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { useUserFetchDataContext } from "../../context/UserFetchDataContext";
import { setPathName } from "../../redux/slices/routeSlice";
import theme from "../../shared/theme";
import { isEmpty } from "../../utils/utils";
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

  const { filteredEvents, loadingStatus } = useUserFetchDataContext();
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  if (status === "error") {
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
          <EventFilter />
          <div className="event-container-grid">
            {isFetching || status === "loading" || loadingStatus ? (
              [...Array(6)].map((i) => (
                <Skeleton width={360} height={260} key={i} />
              ))
            ) : isEmpty(filteredEvents) ? (
              <EmptyData />
            ) : (
              filteredEvents.map((event, index) => (
                <Event event={event} key={event.id} />
              ))
            )}
          </div>
        </div>
        <div className="event-pagination">
          {/* {isFetching || status === "loading" ? null : (
            <Pagination
              current={currentPage + 1}
              onChange={onChange}
              total={eventsPaginated?.totalItems}
              pageSize={6}
            />
          )} */}
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
