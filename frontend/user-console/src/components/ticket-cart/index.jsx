import { t } from "i18next";
import { sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToUSD } from "../../api/services/generalServices";
import paymentServices from "../../api/services/paymentServices";
import { ticketTypeSelector } from "../../redux/slices/ticketSlice";
import { formatter } from "../../utils/utils";
import { AlertErrorPopup, AlertPopup } from "../common/alert";
import TicketCartItem from "../ticket-cart-item";
const { payOrder } = paymentServices;

function TicketCart() {
  const tickets = useSelector(ticketTypeSelector);
  const newArr = tickets.map((t) => ({
    ...t,
    totalPrice: t.quantity * Number(t.price),
  }));
  const ticketCart = newArr.filter((ticket) => ticket.quantity > 0);
  const cartTotalPrice = sumBy(ticketCart, "totalPrice");
  const handlePayOrder = async () => {
    const response = await payOrder({ price: cartTotalPrice.toString() });
    if (response.status !== 200) {
      AlertErrorPopup({
        title: t("popup.payment.error"),
      });
    } else {
      window.open(response.data, "_blank");
    }
  };

  return (
    <>
      <div className="ticket-cart">
        <div className="ticket-cart-title">{t("ticket.cart")}</div>
        <table className="w-full">
          <tr className="ticket-cart-header">
            <th>{t("ticket.type")}</th>
            <th>{t("ticket.quantity")}</th>
          </tr>
          {ticketCart.map((ticket) => (
            <TicketCartItem ticket={ticket} />
          ))}
        </table>
      </div>
      <div className="ticket-cart-total">
        <th>{t("ticket.total")}</th>
        <th>{formatter(tickets[0].currency).format(cartTotalPrice)}</th>
      </div>
      <button
        className="primary-button text-xl p-3 mt-2"
        onClick={handlePayOrder}
      >
        {t("ticket.submit")}
      </button>
    </>
  );
}

export default TicketCart;
