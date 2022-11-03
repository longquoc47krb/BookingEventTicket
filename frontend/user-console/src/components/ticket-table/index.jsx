import axios from "axios";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicketTypeArray,
  ticketTypeSelector,
} from "../../redux/slices/ticketSlice";
import TicketItem from "../ticket-item";

function TicketTable() {
  const ticketType = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTicketType = async () => {
      const response = await axios.get("http://localhost:8000/ticket");
      const newArr = response.data.map((v) => ({ ...v, quantity: 1 }));
      dispatch(setTicketTypeArray(newArr));
    };
    fetchTicketType();
  }, []);
  debugger;
  return (
    <div className="ticket-table-container">
      <table className="w-full">
        <tr className="ticket-table-header">
          <th>{t("ticket.type")}</th>
          <th>{t("ticket.price")}</th>
          <th>{t("ticket.quantity")}</th>
        </tr>
        {ticketType.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
      </table>
    </div>
  );
}

export default TicketTable;
