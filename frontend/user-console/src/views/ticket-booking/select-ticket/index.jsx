import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketCart from "../../../components/ticket-cart";
import TicketTable from "../../../components/ticket-table";
import {
  setTicketTypeArray,
  ticketTypeSelector,
} from "../../../redux/slices/ticketSlice";

function SelectTicket({ data }) {
  console.log({ data });
  const tickets = useSelector(ticketTypeSelector);
  const dispatch = useDispatch();
  useMemo(() => {
    const newArr = data.map((v) => ({ ...v, quantity: 0 }));
    console.log({ newArr });
    dispatch(setTicketTypeArray(newArr));
  }, []);
  console.log({ tickets });
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
