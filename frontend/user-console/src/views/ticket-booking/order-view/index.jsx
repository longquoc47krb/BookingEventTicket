import React from "react";
import { t } from "i18next";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEventDetails } from "../../../api/services/eventServices";
import { useFetchUserInfo } from "../../../api/services/accountServices";
import OrderRowItem from "./order-row";
import AppConfig from "../../../configs/AppConfig";
import OrderTable from "../../../components/common/table/order-table";
const { ORDER_TABLE_HEADER } = AppConfig;
function OrderView() {
  const order = useSelector((state) => state.ticket.customerOrder);
  const { data: event, status: eventStatus } = useEventDetails(order.idEvent);
  const { data: user, status: userStatus } = useFetchUserInfo(order.email);
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
          <h1 className="flex justify-center font-bold text-2xl">
            {t("user.order-title")}
          </h1>
          <div className="grid justify-betweem grid-cols-[minmax(100px,200px)_1fr] gap-y-2 my-2 leading-8 w-full">
            <OrderRowItem
              first={t("customer.name")}
              second={userStatus === "success" ? user.data.name : ""}
            />
            <OrderRowItem
              first={"Email"}
              second={userStatus === "success" ? user.data.email : ""}
            />
            <OrderRowItem
              first={t("event.title")}
              second={eventStatus === "success" ? event.name : ""}
            />
          </div>
          <div class="py-8 w-full">
            <div class="shadow overflow-hidden rounded border-b border-gray-200">
              <OrderTable
                header={ORDER_TABLE_HEADER}
                bodyData={order.customerTicketList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
