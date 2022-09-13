import PropTypes from "prop-types";
import React from "react";
import Header from "../../components/common/header";
import Event from "../../components/event";
import "../../styles/event.scss";
import HeroBanner from "../../components/hero";
import { Helmet } from "react-helmet";
function EventDashBoard(props) {
  const { events } = props;
  console.log({ events });
  return (
    <>
      <Helmet>
        <title>Sự kiện</title>
        <meta name="description" content="Event Dashboard page" />
      </Helmet>
      <Header />
      <HeroBanner />
      <div className="event-container">
        {events?.map((event, index) => (
          <Event event={event} key={event.id} />
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
