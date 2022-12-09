/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { map } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useBeforeUnload, useToggle } from "react-use";
import { useEventDetails } from "../../api/services/eventServices";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import StepBox from "../../components/step-box";
import {
  currentStepSelector,
  setEventId,
  ticketCartSelector,
  totalPriceSelector,
} from "../../redux/slices/ticketSlice";
import constants from "../../utils/constants";
import { displayDate, displayTime, titleCase } from "../../utils/utils";
import OrderView from "./order-view";
import SelectTicket from "./select-ticket";
const { EventStatus } = constants;
function TicketBooking() {
  const { t } = useTranslation();
  const currentStep = useSelector(currentStepSelector);
  const [dirty, toggleDirty] = useToggle(true);
  const dirtyFn = useCallback(() => {
    return dirty;
  }, [dirty]);
  useBeforeUnload(dirtyFn, t("ticket.reload"));
  const { eventId } = useParams();
  const { data: event, status } = useEventDetails(eventId);
  const dispatch = useDispatch();
  const ticketCart = useSelector(ticketCartSelector);
  useEffect(() => {
    const ticketIdArray = map(ticketCart, "id");
  }, []);
  if (localStorage.getItem("i18nextLng") === "en") {
    moment.locale("en");
  } else {
    moment.locale("vi");
  }
  const steps = {
    step1: "ticket-booking.step1",
    step2: "ticket-booking.step2",
    step3: "ticket-booking.step3",
  };
  useEffect(() => {
    dispatch(setEventId(eventId));
  }, []);
  function renderFragment(step) {
    if (status === "success") {
      switch (step) {
        case 0:
          return <SelectTicket data={event.organizationTickets} />;
        case 1:
          return <div>Step 2</div>;
        case 2:
          return <OrderView />;
        default:
          return <SelectTicket />;
      }
    }
  }
  return (
    status === "success" && (
      <>
        <HelmetHeader title={t("pages.ticket-booking")} />
        <Header />
        <div className="booking-container">
          <div className="booking-top">
            <div
              style={{
                background: `linear-gradient(178deg, rgb(16, 30, 62), rgb(0 0 0 / 83%)), url(${event.background})`,
                backgroundSize: "cover",
                height: "15rem",
              }}
            ></div>
            <h1>{event.name}</h1>
            <h2>{event.venue}</h2>
            <p>
              {titleCase(displayDate(event.startingDate))} (
              {displayTime(event.startingTime)}-{displayTime(event.endingTime)})
            </p>
          </div>
          <StepBox steps={steps} />
          <div className="booking-body">{renderFragment(currentStep)}</div>
        </div>
        <Footer />
      </>
    )
  );
}
export default TicketBooking;
