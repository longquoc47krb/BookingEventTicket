/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import { map, sumBy } from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import paymentServices, {
  useCheckOrderAvailability,
} from "../../api/services/paymentServices";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import {
  setTicketCart,
  setTotalPrice,
  setTotalQuantity,
  ticketTypeSelector,
  eventIdSelector,
  createOrderRequest,
  totalPriceSelector,
  totalQuantitySelector,
} from "../../redux/slices/ticketSlice";
import { formatter } from "../../utils/utils";
import { AlertErrorPopup } from "../common/alert";
import TicketCartItem from "../ticket-cart-item";
const { payOrder, checkOrderAvailability } = paymentServices;

function TicketCart() {
  const tickets = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  const newArr = tickets.map((t) => ({
    ...t,
    totalPrice: t.quantity * Number(t.price),
  }));
  const user = useSelector(userInfoSelector);
  const ticketCart = newArr.filter((ticket) => ticket.quantity > 0);
  const cartTotalPrice = sumBy(ticketCart, "totalPrice");
  const cartTotalQuantity = sumBy(ticketCart, "quantity");
  const eventId = useSelector(eventIdSelector);
  const handlePayOrder = async () => {
    dispatch(
      createOrderRequest({
        currency: map(ticketCart, "currency")[0],
        customerTicketList: ticketCart,
        email: user.email,
        idEvent: eventId,
        totalPrice: String(cartTotalPrice),
        totalQuantity: cartTotalQuantity,
      })
    );
    const checkOrderResponse = await checkOrderAvailability({
      currency: map(ticketCart, "currency")[0],
      customerTicketList: ticketCart,
      email: user.email,
      idEvent: eventId,
      totalPrice: String(cartTotalPrice),
      totalQuantity: cartTotalQuantity,
    });
    console.log({ checkOrderResponse });
    // const response = await payOrder({ price: cartTotalPrice.toString() });
    // if (response.status !== 200) {
    //   AlertErrorPopup({
    //     title: t("popup.payment.error"),
    //   });
    // } else {
    //   window.open(response.data);
    // }
  };
  const handleTicketCart = (cart) => {
    const ticketCart = cart.map((item) => ({
      id: item.id,
      currency: item.currency,
      description: item.description,
      idEvent: eventId,
      price: item.price,
      quantity: item.quantity,
      status: item.status,
      ticketName: item.ticketName,
    }));
    return ticketCart;
  };
  useEffect(() => {
    dispatch(setTicketCart(handleTicketCart(ticketCart)));
    dispatch(setTotalPrice(cartTotalPrice));
    dispatch(setTotalQuantity(cartTotalQuantity));
  }, [cartTotalPrice, ticketCart, cartTotalQuantity]);
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
