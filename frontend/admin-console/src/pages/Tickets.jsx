import React, { useEffect } from "react";
import { sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import Event from "../components/EventItem";
import { userInfoSelector } from "../redux/slices/accountSlice";
const Tickets = () => {
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const { data: events, isLoading } = useFetchEventsByOrgID(user.id);
  console.log(
    sortBy(events, [
      { startingDate: (event) => new Date(event.startingDate) },
      { status: (event) => event.status !== "event.completed" },
    ])
  );
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.ticket")} />
      <div className="event-container-grid">
        {sortBy(events, [
          { startingDate: (event) => new Date(event.startingDate) },
          { status: (event) => event.status !== "event.completed" },
        ])?.map((event) => (
          // <CollapseComponent text={event?.name}>
          //   <Table
          //     dataSource={event?.organizationTickets}
          //     columns={ticketColumns}
          //   />
          // </CollapseComponent>
          <Event event={event} />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
