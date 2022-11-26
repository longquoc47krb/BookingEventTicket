import React from "react";
import { t } from "i18next";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEventDetails } from "../../../api/services/eventServices";
import { useFetchUserInfo } from "../../../api/services/accountServices";
import OrderRowItem from "./order-row";
import AppConfig from "../../../configs/AppConfig";
import { formatter } from "../../../utils/utils";
import { sum, sumBy } from "lodash";
const { ORDER_TABLE_HEADER } = AppConfig;
function OrderView() {
  const order = useSelector((state) => state.ticket.customerOrder);
  const { data: event, status: eventStatus } = useEventDetails(order.idEvent);
  const { data: user, status: userStatus } = useFetchUserInfo(order.email);
  const currency = order.customerTicketList[0].currency;
  const total = order.customerTicketList.map(
    (item) => item.quantity * item.price
  );
  console.log({ total });
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
              <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                  <tr>
                    {ORDER_TABLE_HEADER.map((item) => (
                      <th class="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
                        {t(item)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  {order.customerTicketList.map((item, index) => (
                    <tr className={index % 2 === 1 ? "bg-gray-100" : ""}>
                      <td class="text-left py-3 px-4">{item.id}</td>
                      <td class="text-left py-3 px-4">{item.ticketName}</td>
                      <td class="text-left py-3 px-4">
                        {formatter(item.currency).format(item.price)}
                      </td>
                      <td class="text-left py-3 px-4">{item.quantity}</td>
                      <td class="text-left py-3 px-4">
                        {formatter(item.currency).format(
                          item.price * item.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-gray-400 border-t-[1px] w-full">
                    <td
                      className="w-full uppercase font-semibold text-sm text-right py-3 px-4"
                      colspan={4}
                    >
                      {t("ticket.total")}:
                    </td>
                    <td className="uppercase font-semibold text-sm text-right py-3 px-4">
                      {formatter(currency).format(sum(total))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
