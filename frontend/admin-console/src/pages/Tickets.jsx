import React, { useState } from "react";
import { sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import Event from "../components/EventItem";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { Modal, Pagination } from "antd";
import Skeleton from "@mui/material/Skeleton";
import { ticketColumns } from "../data/dummy";
import Table from "../components/Table";
import {
  openTicketModalSelector,
  setOpenTicketModalInTickets,
} from "../redux/slices/ticketSlice";
const Tickets = () => {
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const open = useSelector(openTicketModalSelector);
  const [currentPage, setCurrentPage] = useState(0);
  const [event, setEvent] = useState(null);
  const { data: events, isLoading } = useFetchEventsByOrgID(user.id);
  const dispatch = useDispatch();
  const sortedEvents = sortBy(events, (event) => {
    if (event.status === "event.available") {
      return 1;
    } else if (event.status === "event.completed") {
      return 2;
    }
  });
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  const firstIndex = currentPage * 6;
  const lastIndex = (currentPage + 1) * 6;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 card">
      <Header category={t("sider.management")} title={t("sider.ticket")} />
      <div className="event-container-grid">
        {isLoading
          ? [...Array(6)].map((item) => (
              <Skeleton
                variant="rectangular"
                height={200}
                width={"20vw"}
                color="gray"
              />
            ))
          : sortedEvents?.slice(firstIndex, lastIndex).map((event) => (
              <div>
                <Event
                  event={event}
                  onClick={() => {
                    dispatch(setOpenTicketModalInTickets(true));
                    setEvent(event);
                  }}
                />
              </div>
            ))}
      </div>
      <Modal
        title={event?.name}
        visible={open}
        width={"60vw"}
        closable={false}
        onCancel={() => dispatch(setOpenTicketModalInTickets(false))}
        onOk={() => dispatch(setOpenTicketModalInTickets(false))}
      >
        <Table
          dataSource={event?.organizationTickets}
          columns={ticketColumns}
        />
      </Modal>
      <div className="w-full flex justify-center mt-6">
        <Pagination
          current={currentPage + 1}
          onChange={onChange}
          total={sortedEvents?.length}
          pageSize={6}
          defaultCurrent={1}
        />
      </div>
    </div>
  );
};

export default Tickets;
