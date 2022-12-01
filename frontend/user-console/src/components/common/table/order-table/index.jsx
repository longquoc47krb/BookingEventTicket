import { t } from 'i18next';
import { sum } from 'lodash';
import React from 'react'
import { formatter } from '../../../../utils/utils';

function OrderTable(props) {
   const { header, bodyData } = props;
   const currency = bodyData[0].currency;
  const total = bodyData.map(
    (item) => item.quantity * item.price
  );
  return (
    <table class="min-w-full bg-white">
    <thead class="bg-gray-800 text-white">
      <tr>
        {/* {ORDER_TABLE_HEADER.map((item) => ( */}
        {header.map((item) => (
          <th class="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
            {t(item)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody class="text-gray-700">
      {/* {order.customerTicketList.map((item, index) => ( */}
      {bodyData.map((item, index) => (
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
  )
}

export default OrderTable