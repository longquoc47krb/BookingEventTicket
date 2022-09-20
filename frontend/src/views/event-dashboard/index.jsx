/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { getEvents } from "../../redux/slices/eventSlice";
import "../../styles/event.scss";
function EventDashBoard(props) {
  const { events } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  console.log({ events });
  return (
    <>
      <HelmetHeader title="Sự kiện" content="Event Dashboard" />
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
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
