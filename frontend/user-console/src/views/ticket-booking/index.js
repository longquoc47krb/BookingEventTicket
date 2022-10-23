import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/header";
import StepBox from "../../components/step-box";
import PropTypes from "prop-types";
import AppConfig from "../../configs/AppConfig";
const { ORGANIZER_CAROUSEL } = AppConfig;
function TicketBooking(props) {
  const { event } = props;
  const { t } = useTranslation();
  const steps = {
    step1: "ticket-booking.step1",
    step2: "ticket-booking.step2",
    step3: "ticket-booking.step3",
    step4: "ticket-booking.step4",
  };
  return (
    <>
      <Header />
      <div className="booking-container">
        <div className="booking-top">
          <img
            src={ORGANIZER_CAROUSEL[2].background}
            alt="booking-background"
          />
          <h1>{event.name}</h1>
        </div>
        <StepBox steps={steps} />
      </div>
    </>
  );
}
TicketBooking.defaultProps = {
  event: {
    name: "Những thành phố mơ màng",
  },
};
TicketBooking.propTypes = {
  event: PropTypes.object.isRequired,
};
export default TicketBooking;
