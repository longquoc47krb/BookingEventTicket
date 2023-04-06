/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import { map, sumBy } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import paymentServices from "../../api/services/paymentServices";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import {
  createOrderRequest,
  eventIdSelector,
  setErrors,
  ticketTypeSelector,
} from "../../redux/slices/ticketSlice";
import { formatter } from "../../utils/utils";
import ThreeDotsLoading from "../loading/three-dots";
import TicketCartItem from "../ticket-cart-item";
const { payOrder, checkOrderAvailability, payOrderVNPay } = paymentServices;

function TicketCart() {
  const tickets = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const newArr = tickets.map((t) => ({
    ...t,
    totalPrice: t.ticketInCartQuantity * Number(t.price),
  }));
  const user = useSelector(userInfoSelector);
  const ticketCart = newArr.filter((ticket) => ticket.ticketInCartQuantity > 0);
  var currency = map(ticketCart, "currency")[0];
  const cartTotalPrice = sumBy(ticketCart, "totalPrice");
  const cartTotalQuantity = sumBy(ticketCart, "ticketInCartQuantity");
  const eventId = useSelector(eventIdSelector);

  const handlePayOrder = async () => {
    setLoading(true);
    dispatch(
      createOrderRequest({
        currency: map(ticketCart, "currency")[0],
        customerTicketList: handleTicketCart(ticketCart),
        email: user.email,
        idEvent: eventId,
        totalPrice: String(cartTotalPrice),
        totalQuantity: cartTotalQuantity,
      })
    );
    const checkOrderResponse = await checkOrderAvailability(user.id, {
      currency: map(ticketCart, "currency")[0],
      customerTicketList: handleTicketCart(ticketCart),
      email: user.email,
      idEvent: eventId,
      totalPrice: String(cartTotalPrice),
      totalQuantity: cartTotalQuantity,
    });

    dispatch(
      setErrors(
        checkOrderResponse.status === 200
          ? []
          : Object.keys(checkOrderResponse.data)
      )
    );
    setLoading(checkOrderResponse.status ? false : true);
    if (checkOrderResponse.status === 200) {
      if (currency === "USD") {
        const response = await payOrder({ price: cartTotalPrice.toString() });
        if (response.status === 200) {
          window.open(response.data, "_self");
        }
      } else {
        const response = await payOrderVNPay({
          currency: map(ticketCart, "currency")[0],
          customerTicketList: handleTicketCart(ticketCart),
          email: user.email,
          idEvent: eventId,
          totalPrice: String(cartTotalPrice),
          totalQuantity: cartTotalQuantity,
        });
        if (response.status === 200) {
          window.open(response.data, "_self");
        }
      }
    }
  };
  const handleTicketCart = (cart) => {
    const ticketCart = cart.map((item) => ({
      id: item.id,
      currency: item.currency,
      description: item.description,
      idEvent: eventId,
      price: item.price,
      quantity: item.ticketInCartQuantity,
      status: item.status,
      ticketName: item.ticketName,
    }));
    return ticketCart;
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
        <th>{formatter(currency).format(cartTotalPrice)}</th>
      </div>
      <button
        className="primary-button text-xl p-3 mt-2"
        onClick={handlePayOrder}
      >
        {loading ? <ThreeDotsLoading /> : t("ticket.submit")}
      </button>
    </>
  );
}

export default TicketCart;
