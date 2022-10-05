/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useFetchEventsForPagination } from "../../api/services/eventServices";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../../components/common/footer";
import { setPathName } from "../../redux/slices/locationSlice";
function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  dispatch(setPathName(window.location.pathname));
  const { data: eventsPaginated, isFetching } =
    useFetchEventsForPagination(currentPage);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  return (
    <>
      <HelmetHeader title="Sự kiện" content="Event Dashboard" />
      <Header showSearchBox={false} />
      <HeroBanner />
      <div className="event-container">
        {isFetching
          ? [...Array(6)].map((i) => (
              <Skeleton width={360} height={260} key={i} />
            ))
          : eventsPaginated &&
            eventsPaginated.data?.map((event, index) => (
              <Event event={event} key={event.id} />
            ))}
      </div>
      <div className="w-full flex justify-center mb-10">
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
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
