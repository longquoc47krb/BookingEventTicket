import React from "react";
import { useDispatch } from "react-redux";
import { decreaseTicket, increaseTicket } from "../../redux/slices/ticketSlice";
import { formatter, isNotEmpty } from "../../utils/utils";

function TicketItem({ ticket }) {
  const dispatch = useDispatch();

  return (
    <tr className="ticket-table-item">
      <th>{ticket.ticketName}</th>
      <th>
        <span className="font-semibold text-[#1f3e82]">
          {formatter(ticket.currency).format(ticket.price)}
        </span>
      </th>
      <th className="flex items-center">
        <button onClick={() => dispatch(decreaseTicket(ticket.ticketName))}>
          -
        </button>
        <input
          value={
            ticket.quantity < 6 && isNotEmpty(ticket.quantity)
              ? ticket.quantity
              : 5
          }
        />
        <button onClick={() => dispatch(increaseTicket(ticket.ticketName))}>
          +
        </button>
      </th>
    </tr>
  );
}

export default TicketItem;
