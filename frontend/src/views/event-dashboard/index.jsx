import PropTypes from "prop-types";
import React from "react";
import Header from "../../components/common/header";
import Event from "../../components/event";
import "../../styles/event.scss";
import HeroBanner from "../../components/hero";
function EventDashBoard(props) {
  const { events } = props;
  console.log({ events });
  return (
    <>
      <Header />
      <HeroBanner />
      <div className="event-container">
        {events?.map((event, index) => (
          <Event event={event} key={index} />
        ))}
      </div>
    </>
  );
}
EventDashBoard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
EventDashBoard.defaultProps = {
  events: null,
};
export default EventDashBoard;
