import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useFetchEvents } from "../../api/services/eventServices";
import { useGetOrderListByUserId } from "../../api/services/orderServices";
import Empty from "../../assets/Empty.svg";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import HelmetHeader from "../../components/helmet";
import SearchTicketBox from "../../components/searchbox-ticket";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { ticketSearchListSelector } from "../../redux/slices/generalSlice";
import { isEmpty, isNotEmpty } from "../../utils/utils";
import PurchaseTicketItem from "./purchased-ticket-item";
const PurchasedTickets = () => {
  const user = useSelector(userInfoSelector);
  const ticketSearchList = useSelector(ticketSearchListSelector);
  const { data: tickets, status, isLoading } = useGetOrderListByUserId(user.id);
  const { data: allEvents, status: allEventsStatus } = useFetchEvents();

  const ticketListWithEventName = tickets?.map((ticket) => {
    const { idEvent, ...rest } = ticket;
    const { name } =
      isNotEmpty(allEvents) && allEvents?.find((event) => event.id === idEvent);
    return { idEvent, eventName: name, ...rest };
  });

  const [currentPage, setCurrentPage] = useState(0);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  const firstIndex = currentPage * 3;
  const lastIndex = (currentPage + 1) * 3;
  const { t } = useTranslation();
  useEffect(() => {
    setCurrentPage(0);
  }, [ticketSearchList]);
  const transformedTicket = ticketSearchList?.map((obj) => obj.item);
  return (
    <div className="bg-[#dedede]">
      <HelmetHeader title={t("user.my-ticket")} />
      <Header />
      <div className="w-screen h-full  min-h-[60vh]">
        <div className="mx-auto w-full">
          <SectionTitle>{t("user.my-ticket")}</SectionTitle>
          <div className="flex justify-center w-full mx-4">
            <SearchTicketBox
              data={ticketListWithEventName}
              placeholder={t("ticket.placeholder-searchbox")}
            />
          </div>
          <div className="px-8 my-4 w-full h-full block">
            {status === "loading"
              ? [...Array(3)].map((i) => (
                  <Skeleton style={{ height: 400, width: "100%" }} />
                ))
              : isEmpty(ticketSearchList)
              ? [...ticketListWithEventName]
                  .reverse()
                  .slice(firstIndex, lastIndex)
                  .map((ticket) => <PurchaseTicketItem data={ticket} />)
              : [...transformedTicket]
                  .reverse()
                  .slice(firstIndex, lastIndex)
                  .map((ticket) => <PurchaseTicketItem data={ticket} />)}
            {isEmpty(tickets) && (
              <div className="w-auto flex justify-center items-center flex-col mb-5">
                <img
                  src={Empty}
                  className="w-[20rem] h-[20rem]"
                  alt="empty"
                  href="https://storyset.com/web"
                />
                <span className="text-3xl font-semibold mb-2">
                  {t("ticket.not-found")}
                </span>
              </div>
            )}
            {
              <Pagination
                current={currentPage + 1}
                onChange={onChange}
                total={
                  isNotEmpty(ticketSearchList)
                    ? ticketSearchList?.length
                    : tickets?.length
                }
                pageSize={3}
                defaultCurrent={1}
              />
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedTickets;
