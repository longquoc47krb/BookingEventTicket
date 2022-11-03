import React, { useState } from "react";
import { formatter, isNotEmpty } from "../../utils/utils";

function TicketItem({ ticket }) {
  const [value, setValue] = useState(0);

  return (
    <tr className="ticket-table-item">
      <th>{ticket.type}</th>
      <th>{formatter.format(ticket.price)}</th>
      <th className="flex items-center">
        <button
          onClick={() =>
            setValue(ticket.quantity > 0 ? ticket.quantity - 1 : 0)
          }
        >
          -
        </button>
        <input
          value={
            ticket.quantity < 6 && isNotEmpty(ticket.quantity)
              ? ticket.quantity
              : 5
          }
        />
        <button
          onClick={() =>
            setValue(ticket.quantity > 5 ? 5 : ticket.quantity + 1)
          }
        >
          +
        </button>
      </th>
    </tr>
  );
}

export default TicketItem;
