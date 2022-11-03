import { t } from "i18next";
import React from "react";
import { formatter } from "../../utils/utils";

function TicketCart() {
  return (
    <>
      <div className="ticket-cart">
        <div className="ticket-cart-title">{t("ticket.cart")}</div>
        <table className="w-full">
          <tr className="ticket-cart-header">
            <th>{t("ticket.type")}</th>
            <th>{t("ticket.quantity")}</th>
          </tr>
        </table>
      </div>
      <div className="ticket-cart-total">
        <th>{t("ticket.total")}</th>
        <th>{formatter.format(4000000000)}</th>
      </div>
    </>
  );
}

export default TicketCart;
