import { t } from "i18next";
import React from "react";

function TicketTable() {
  return (
    <div>
      <div className="ticket-table-container">
        <div className="ticket-table-header">
          <div>{t("ticket.type")}</div>
          <div>{t("ticket.price")}</div>
          <div>{t("ticket.quantity")}</div>
        </div>
      </div>
    </div>
  );
}

export default TicketTable;
