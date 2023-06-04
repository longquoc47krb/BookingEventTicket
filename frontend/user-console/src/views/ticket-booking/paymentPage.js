/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import orderServices from "../../api/services/orderServices";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import {
  createOrderRequest,
  createOrderRequestSelector,
  eventIdSelector,
  setCancel,
  setCurrentStep,
  setCustomerOrder,
  setSuccess,
} from "../../redux/slices/ticketSlice";
const { createOrder } = orderServices;
function PaymentPage() {
  // eslint-disable-next-line no-unused-vars
  const [query, setQueryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventId = useSelector(eventIdSelector);
  const user = useSelector(userInfoSelector);
  const createOrderReq = useSelector(createOrderRequestSelector);
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
    if (isSuccess && !isCancel) {
      dispatch(setCurrentStep(2));
      const createOrderAsync = async () => {
        const createOrderResponse = await createOrder(user.id, createOrderReq);
        if (createOrderResponse.status === 200) {
          dispatch(setCustomerOrder(createOrderResponse.data));
          dispatch(createOrderRequest(null));
          navigate(`/ticket-booking/${eventId}`);
        } else {
          navigate(`/event/${eventId}`);
        }
      };
      createOrderAsync();
    } else {
      setTimeout(() => {
        navigate(`/event/${eventId}`);
      }, 300);
    }
  }, []);
  const pageRendering = (success, cancel) => {
    if (success && !cancel) {
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
