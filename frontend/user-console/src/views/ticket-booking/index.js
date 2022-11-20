import React, { useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/header";
import StepBox from "../../components/step-box";
import PropTypes from "prop-types";
import AppConfig from "../../configs/AppConfig";
import { useEventDetails } from "../../api/services/eventServices";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { displayDate, displayTime, titleCase } from "../../utils/utils";
import constants from "../../utils/constants";
import NotFoundPage from "../not-found";
import TicketTable from "../../components/ticket-table";
import Footer from "../../components/common/footer";
import HelmetHeader from "../../components/helmet";
import SelectTicket from "./select-ticket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
  setEventId,
} from "../../redux/slices/ticketSlice";
import { useBeforeUnload, useToggle } from "react-use";
const { EventStatus } = constants;
function TicketBooking() {
  const { t } = useTranslation();
  const currentStep = useSelector(currentStepSelector);
  const [dirty, toggleDirty] = useToggle(true);
  const dirtyFn = useCallback(() => {
    return dirty;
  }, [dirty]);
  console.log({ dirty });
  useBeforeUnload(dirtyFn, t("ticket.reload"));
  const { eventId } = useParams();
  const { data: event, status } = useEventDetails(eventId);
  const dispatch = useDispatch();
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
  console.log({ event });
  function renderFragment(step) {
    if (status === "success") {
      console.log(event.organizationTickets);
      switch (step) {
        case 0:
          return <SelectTicket data={event.organizationTickets} />;
        case 1:
          return <div>Step 2</div>;
        case 2:
          return <div>Step 3</div>;
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
