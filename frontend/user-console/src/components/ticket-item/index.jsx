import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { decreaseTicket, increaseTicket } from "../../redux/slices/ticketSlice";
import { TicketStatus } from "../../utils/constants";
import { formatter, isNotEmpty } from "../../utils/utils";

function TicketItem({ ticket }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <tr
      className={
        ticket.status === TicketStatus.SOLD_OUT
          ? "ticket-table-item text-gray-200 bg-[#b8b8b8] cursor-not-allowed"
          : "ticket-table-item"
      }
    >
      <th>
        {ticket.ticketName}{" "}
        <span className="text-gray-400 text-xs">
          ({t("ticket-remaining", { val: ticket.quantityRemaining })})
        </span>
      </th>
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
            ticket.ticketInCartQuantity < 6 &&
            isNotEmpty(ticket.ticketInCartQuantity)
              ? ticket.ticketInCartQuantity
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
