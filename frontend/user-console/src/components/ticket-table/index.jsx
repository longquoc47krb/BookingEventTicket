import axios from "axios";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicketTypeArray,
  ticketTypeSelector,
} from "../../redux/slices/ticketSlice";
import TicketItem from "../ticket-item";

function TicketTable({ ticketType }) {
  const tickets = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const newArr = ticketType.map((v) => ({ ...v, quantity: 0 }));
    dispatch(setTicketTypeArray(newArr));
  }, []);
  return (
    <div className="ticket-table-container">
      <table className="w-full">
        <tr className="ticket-table-header">
          <th>{t("ticket.type")}</th>
          <th>{t("ticket.price")}</th>
          <th>{t("ticket.quantity")}</th>
        </tr>
        {tickets.map((ticket, index) => (
          <TicketItem ticket={ticket} key={index} />
        ))}
      </table>
    </div>
  );
}

export default TicketTable;
