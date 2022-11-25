import React from "react";
import { t } from "i18next";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

function OrderView() {
  const order = useSelector((state) => state.ticket.customerOrder);
  console.log({ order });
  return (
    <div className="w-screen h-full">
      <div className="w-full p-8">
        <div className="order-container">
          <div className="flex justify-center items-center gap-x-4">
            <AiFillCheckCircle className="text-green-600 text-4xl" />
            <h1 className="text-xl font-semibold">
              {t("user.payment-success")}
            </h1>
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}

export default OrderView;
