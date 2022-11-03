import React from "react";
import TicketCart from "../../../components/ticket-cart";
import TicketTable from "../../../components/ticket-table";

function SelectTicket() {
  return (
    <div className="flex">
      <div className="booking-ticket-table">
        <TicketTable />
      </div>
      <div className="booking-cart">
        <TicketCart />
      </div>
    </div>
  );
}

export default SelectTicket;
