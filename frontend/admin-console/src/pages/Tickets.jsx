import React from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import CollapseComponent from "../components/Collapse";
import { userInfoSelector } from "../redux/slices/accountSlice";
import Table from "../components/Table";
import { ticketColumns } from "../data/dummy";
const Tickets = () => {
  const { t } = useTranslation();
  const { log } = console;
  const user = useSelector(userInfoSelector);
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  log({ events });
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("sider.management")} title={t("sider.ticket")} />
      {events?.map((event) => (
        <CollapseComponent text={event?.name}>
          <Table
            dataSource={event?.organizationTickets}
            columns={ticketColumns}
          />
        </CollapseComponent>
      ))}
    </div>
  );
};

export default Tickets;
