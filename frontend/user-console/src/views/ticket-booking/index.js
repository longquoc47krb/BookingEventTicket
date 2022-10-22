import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/header";
import StepBox from "../../components/step-box";

function TicketBooking() {
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
            src="https://images.unsplash.com/photo-1523521803700-b3bcaeab0150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="test"
          />
        </div>
        <StepBox steps={steps} />
      </div>
    </>
  );
}

export default TicketBooking;
