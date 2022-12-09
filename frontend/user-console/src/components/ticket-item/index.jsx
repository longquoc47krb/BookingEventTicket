import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseTicket,
  errorsSelector,
  increaseTicket,
} from "../../redux/slices/ticketSlice";
import { TicketStatus } from "../../utils/constants";
import { formatter, isNotEmpty } from "../../utils/utils";

function TicketItem({ ticket }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const errors = useSelector(errorsSelector);
  const error = errors.filter((e) => e === ticket.ticketName);
  return (
    <div>
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
                : () =>
                    dispatch(
                      increaseTicket({
                        ticketName: ticket.ticketName,
                        quantityRemaining: ticket.quantityRemaining,
                      })
                    )
            }
          >
            +
          </button>
        </th>
      </tr>
      {isNotEmpty(error) && (
        <h1 className="text-red-600 font-medium text-base">
          {t("popup.check-order.400", { val: error })}
        </h1>
      )}
    </div>
  );
}

export default TicketItem;
