import React from "react";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HeroBanner from "../../components/hero";
import PropTypes from "prop-types";
function EventDashBoard(props) {
  const { events } = props;
  return (
    <>
      <Header />
      <HeroBanner />
      <div className='w-[100vw] px-3 bg-red-500 h-[100vh] grid-cols-3 grid'>
        {events.map((item, index) => (
          <Event event={item} />
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
