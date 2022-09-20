import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Header from "../../components/common/header";
import Event from "../../components/event";
import "../../styles/event.scss";
import HeroBanner from "../../components/hero";
import { Helmet } from "react-helmet";
import { connect, useDispatch } from "react-redux";
import { getEvents } from "../../redux/slices/eventSlice";
function EventDashBoard(props) {
  const { events } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
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
const mapStateToProps = (state) => ({
  events: state.event.events,
});
export default connect(mapStateToProps)(EventDashBoard);
