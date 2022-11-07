import { t } from "i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  eventIdSelector,
  setCancel,
  setCurrentStep,
  setSuccess,
} from "../../redux/slices/ticketSlice";

function Payment() {
  const [query, setQueryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventId = useSelector(eventIdSelector);
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
  }, []);
  const renderer = ({ seconds }) => {
    return <span>{seconds}s</span>;
  };
  const pageRendering = (success, cancel) => {
    if (success) {
      dispatch(setCurrentStep(2));
      setTimeout(() => {
        return navigate(`/ticket-booking/${eventId}`);
      }, 200);

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
