import { t } from "i18next";
import React, { useEffect } from "react";
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
} from "../../redux/slices/ticketSlice";
import { map } from "lodash";
const { createOrder } = orderServices;
const { reduceTicketQuantityAsync } = ticketServices;
function Payment() {
  const [query, setQueryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventId = useSelector(eventIdSelector);
  const ticketCart = useSelector(ticketCartSelector);
  const ticketIdArray = map(ticketCart, "id");
  const totalPrice = useSelector(totalPriceSelector);
  console.log({ ticketCart });
  console.log({ ticketIdArray });
  const totalQuantity = useSelector(totalQuantitySelector);
  const user = useSelector(userInfoSelector);
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
    if (isSuccess) {
      const createOrderRequest = {
        customerTicketList: ticketCart,
        email: user.email,
        idEvent: eventId,
        totalPrice: String(totalPrice),
        totalQuantity,
      };

      dispatch(setCurrentStep(2));
      const createOrderAsync = async () => {
        const createOrderResponse = await createOrder(
          user.id,
          createOrderRequest
        );
        if (createOrderResponse.status === 200) {
          dispatch(setCustomerOrder(createOrderResponse.data));
          // for (let ticketId = 0; ticketIdArray.length; ticketId++) {
          //   await reduceTicketQuantityAsync(eventId, ticketId);
          // }
          return navigate(`/ticket-booking/${eventId}`);
        } else {
          return null;
        }
      };
      createOrderAsync();
      setTimeout(() => {
        return navigate(`/ticket-booking/${eventId}`);
      }, 200);
    }
  }, [
    dispatch,
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

export default Payment;
