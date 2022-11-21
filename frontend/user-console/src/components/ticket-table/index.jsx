import { t } from "i18next";
import React from "react";
import TicketItem from "../ticket-item";

function TicketTable({ ticketType }) {
  return (
    <div className="ticket-table-container">
      <table className="w-full">
        <tr className="ticket-table-header">
          <th>{t("ticket.type")}</th>
          <th>{t("ticket.price")}</th>
          <th>{t("ticket.quantity")}</th>
        </tr>
        {ticketType.map((ticket, index) => (
          <TicketItem ticket={ticket} key={index} />
        ))}
      </table>
    </div>
  );
}

export default TicketTable;
