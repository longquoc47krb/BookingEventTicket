/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import Pagination from "../../components/pagination";
function EventDashBoard(props) {
  const { events } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);

  // Get current posts
  const indexOfLastPost = currentPage * eventsPerPage;
  const indexOfFirstPost = indexOfLastPost - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <HelmetHeader title="Sự kiện" content="Event Dashboard" />
      <Header />
      <HeroBanner />
      <div className="event-container">
        {events &&
          currentEvents.map((event, index) => (
            <Event event={event} key={event.id} />
          ))}
      </div>
      <Pagination
        postsPerPage={eventsPerPage}
        totalPosts={events.length}
        paginate={paginate}
      />
    </>
  );
}
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
