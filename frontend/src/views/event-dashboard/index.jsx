/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Divider, Pagination } from "antd";
import { useFetchEventsForPagination } from "../../api/services/eventServices";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../../components/common/footer";
import { setPathName } from "../../redux/slices/routeSlice";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { orderByDate } from "../../utils/utils";
function EventDashBoard() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <HelmetHeader title="Sự kiện" content="Event Dashboard" />
        <Header showSearchBox={false} />
        <HeroBanner />
        <div className="event-container">
          <Divider style={{ color: "black", border: "gray" }}>
            <h1 className="flex justify-center text-[#004c6d] font-bold text-5xl">
              Danh sách Sự kiện{" "}
            </h1>
          </Divider>
          <div className="event-container-grid">
            {isFetching
              ? [...Array(6)].map((i) => (
                  <Skeleton width={360} height={260} key={i} />
                ))
              : eventsPaginated &&
                orderByDate(eventsPaginated.data, "startingDate").map(
                  (event, index) => <Event event={event} key={event.id} />
                )}
          </div>
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
}
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
