/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketCart from "../../../components/ticket-cart";
import TicketTable from "../../../components/ticket-table";
import {
  setTicketTypeArray,
  ticketTypeSelector,
} from "../../../redux/slices/ticketSlice";

function SelectTicket({ data }) {
  const tickets = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 1) {
      const newArr = data.map((v) => ({ ...v, ticketInCartQuantity: 1 }));
      dispatch(setTicketTypeArray(newArr));
    } else {
      const newArr = data.map((v) => ({ ...v, ticketInCartQuantity: 0 }));
      dispatch(setTicketTypeArray(newArr));
    }
  }, [data]);
  return (
    <div className="flex">
      <div className="booking-ticket-table">
        <TicketTable ticketType={tickets} />
      </div>
      <div className="booking-cart">
        <TicketCart />
      </div>
    </div>
  );
}

export default SelectTicket;
