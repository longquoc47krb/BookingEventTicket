/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Pagination } from "antd";
import { useFetchEventsForPagination } from "../../api/services/eventServices";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function EventDashBoard(props) {
  const [currentPage, setCurrentPage] = useState(0);
  // const results = useSelector(resultSelector);
  const { data: eventsPaginated, isFetching } =
    useFetchEventsForPagination(currentPage);

  console.log({ eventsPaginated, isFetching });
  // Change page
  const onChange = (page) => {
    console.log(page);
    setCurrentPage(page - 1);
  };
  return (
    <>
      <HelmetHeader title="Sự kiện" content="Event Dashboard" />
      <Header />
      <HeroBanner />
      <div className="event-container">
        {isFetching
          ? [...Array(6)].map((i) => (
              <Skeleton width={360} height={260} key={i} />
              // <div className="h-[260px] w-[360px] bg-red-500"></div>
            ))
          : eventsPaginated &&
            eventsPaginated.data?.map((event, index) => (
              <Event event={event} key={event.id} />
            ))}
      </div>
      <div className="w-full flex justify-center">
        {isFetching ? null : (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={eventsPaginated?.totalItems}
            pageSize={6}
          />
        )}
      </div>
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
