import React from "react";
import { useDispatch } from "react-redux";
import { decreaseTicket, increaseTicket } from "../../redux/slices/ticketSlice";
import { TicketStatus } from "../../utils/constants";
import { formatter, isNotEmpty } from "../../utils/utils";

function TicketItem({ ticket }) {
  const dispatch = useDispatch();

  return (
    <tr
      className={
        ticket.status === TicketStatus.SOLD_OUT
          ? "ticket-table-item text-gray-200 bg-[#b8b8b8] cursor-not-allowed"
          : "ticket-table-item"
      }
    >
      <th>{ticket.ticketName}</th>
      <th>
        <span
          className={
            ticket.status === TicketStatus.SOLD_OUT
              ? "font-semibold text-gray-200"
              : "font-semibold text-[#1f3e82]"
          }
        >
          {formatter(ticket.currency).format(ticket.price)}
        </span>
      </th>
      <th className="flex items-center">
        <button
          onClick={
            ticket.status === TicketStatus.SOLD_OUT
              ? undefined
              : () => dispatch(decreaseTicket(ticket.ticketName))
          }
          id={ticket.status === TicketStatus.SOLD_OUT ? "soldout" : ""}
        >
          -
        </button>
        <input
          value={
            ticket.quantity < 6 && isNotEmpty(ticket.quantity)
              ? ticket.quantity
              : 5
          }
        />
        <button
          id={ticket.status === TicketStatus.SOLD_OUT ? "soldout" : ""}
          onClick={
            ticket.status === TicketStatus.SOLD_OUT
              ? undefined
              : () => dispatch(increaseTicket(ticket.ticketName))
          }
        >
          +
        </button>
      </th>
    </tr>
  );
}

export default TicketItem;
