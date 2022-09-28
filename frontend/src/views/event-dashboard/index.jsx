/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllEvents } from "../../api/eventApi";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import "../../styles/event.scss";
function EventDashBoard(props) {
  const { data: events } = useFetchEvents();
  return (
    <>
      <HelmetHeader title="Sự kiện" content="Event Dashboard" />
      <Header />
      <HeroBanner />
      <div className="event-container">
        {/* {fetching && <p>Loading ...</p>} */}
        {events["data"].map((event, index) => (
          <Event event={event} key={event.id} />
        ))}
      </div>
    </>
  );
}
export default EventDashBoard;
