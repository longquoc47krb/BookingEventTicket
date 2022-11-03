import { t } from "i18next";
import { sumBy } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { ticketTypeSelector } from "../../redux/slices/ticketSlice";
import { formatter } from "../../utils/utils";
import TicketCartItem from "../ticket-cart-item";

function TicketCart() {
  const tickets = useSelector(ticketTypeSelector);
  const newArr = tickets.map((t) => ({
    ...t,
    totalPrice: t.quantity * t.price,
  }));
  const ticketCart = newArr.filter((ticket) => ticket.quantity > 0);
  console.log({ ticketCart });
  const cartTotalPrice = sumBy(ticketCart, "totalPrice");
  return (
    <>
      <div className="ticket-cart">
        <div className="ticket-cart-title">{t("ticket.cart")}</div>
        <table className="w-full">
          <tr className="ticket-cart-header">
            <th>{t("ticket.type")}</th>
            <th>x{t("ticket.quantity")}</th>
          </tr>
          {ticketCart.map((ticket) => (
            <TicketCartItem ticket={ticket} />
          ))}
        </table>
      </div>
      <div className="ticket-cart-total">
        <th>{t("ticket.total")}</th>
        <th>{formatter.format(cartTotalPrice)}</th>
      </div>
    </>
  );
}

export default TicketCart;
