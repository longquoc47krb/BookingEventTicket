/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import orderServices from "../../api/services/orderServices";
import ticketServices from "../../api/services/ticketServices";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import {
  setCustomerOrder,
  eventIdSelector,
  setCancel,
  setCurrentStep,
  setSuccess,
  ticketCartSelector,
  totalPriceSelector,
  totalQuantitySelector,
  setTicketCart,
  clearCart,
  createOrderRequestSelector,
} from "../../redux/slices/ticketSlice";
import { map } from "lodash";
const { createOrder } = orderServices;
const { reduceTicketQuantityAsync } = ticketServices;
function PaymentPage() {
  const [query, setQueryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventId = useSelector(eventIdSelector);
  const ticketCart = useSelector(ticketCartSelector);
  const totalPrice = useSelector(totalPriceSelector);
  console.log({ ticketCart });
  const totalQuantity = useSelector(totalQuantitySelector);
  const user = useSelector(userInfoSelector);
  const currency = map(ticketCart, "currency")[0];
  const createOrderRequest = useSelector(createOrderRequestSelector);
  console.log({ currency });
  console.log({ ticketCart });
  const isSuccess =
    query.get("success") !== null
      ? query.get("success") === "true"
        ? true
        : false
      : false;
  const isCancel =
    query.get("cancel") !== null
      ? query.get("cancel") === "true"
        ? true
        : false
      : false;
  useEffect(() => {
    dispatch(setSuccess(isSuccess));
    dispatch(setCancel(isCancel));
    console.log(isSuccess);
    if (isSuccess) {
      console.log({ createOrderRequest });
      dispatch(setCurrentStep(2));
      const createOrderAsync = async () => {
        const createOrderResponse = await createOrder(
          user.id,
          createOrderRequest
        );
        if (createOrderResponse.status === 200) {
          dispatch(setCustomerOrder(createOrderResponse.data));
          dispatch(clearCart());
          navigate(`/ticket-booking/${eventId}`);
        } else {
          navigate(`/event/${eventId}`);
        }
      };
      createOrderAsync();
    }
  }, [
    eventId,
    isCancel,
    isSuccess,
    navigate,
    ticketCart,
    totalPrice,
    totalQuantity,
    user.email,
    user.id,
  ]);
  const pageRendering = (success, cancel) => {
    if (success) {
      return <h1 className="text-2xl">{t("user.payment.success")}</h1>;
    } else {
      return <h1 className="text-2xl">{t("user.payment.error")}</h1>;
    }
  };
  return (
    <div className="w-screen h-screen bg-white">
      {pageRendering(isSuccess, isCancel)}
    </div>
  );
}

export default PaymentPage;
