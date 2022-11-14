import React from "react";
import { formatter } from "../../utils/utils";

function TicketCartItem({ ticket }) {
  return (
    <tr className="ticket-cart-item">
      <th className="flex flex-col">
        <span>{ticket.ticketName}</span>
        {/* <span>{formatter(ticket.currency).format(ticket.price)}</span> */}
      </th>
      <th className="flex flex-col">
        <span>x {ticket.quantity}</span>
        <span>
          {formatter(ticket.currency).format(ticket.quantity * ticket.price)}
        </span>
      </th>
    </tr>
  );
}

export default TicketCartItem;
