import { t } from "i18next";
import { sumBy } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
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
    totalPrice: t.quantity * t.price,
  }));
  const ticketCart = newArr.filter((ticket) => ticket.quantity > 0);
  console.log({ ticketCart });
  const cartTotalPrice = sumBy(ticketCart, "totalPrice");
  const handlePayOrder = async () => {
    const response = await payOrder({ price: cartTotalPrice.toString() });
    console.log(">> response:", response);
    if (response.status !== 200) {
      AlertErrorPopup({
        title: t("popup.payment.error"),
      });
    } else {
      AlertPopup({
        title: t("popup.payment.success"),
      });
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
        <th>{formatter.format(cartTotalPrice)}</th>
      </div>
      <button className="primary-button mt-2" onClick={handlePayOrder}>
        {t("ticket.submit")}
      </button>
    </>
  );
}

export default TicketCart;
