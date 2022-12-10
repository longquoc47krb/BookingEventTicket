import { Pagination } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useGetOrderListByUserId } from "../../api/services/orderServices";
import Empty from "../../assets/Empty.svg";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SectionTitle from "../../components/common/section-title";
import HelmetHeader from "../../components/helmet";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { isEmpty, isNotEmpty } from "../../utils/utils";
import PurchaseTicketItem from "./purchased-ticket-item";
const PurchasedTickets = () => {
  const user = useSelector(userInfoSelector);
  // eslint-disable-next-line no-unused-vars
  const { data: tickets, status, isLoading } = useGetOrderListByUserId(user.id);
  const [currentPage, setCurrentPage] = useState(0);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  const firstIndex = currentPage * 3;
  const lastIndex = (currentPage + 1) * 3;
  const { t } = useTranslation();
  return (
    <div className="bg-[#dedede]">
      <HelmetHeader title={t("user.my-ticket")} />
      <Header />
      <div className="w-screen h-full  min-h-[60vh]">
        <div className="mx-auto w-full">
          <SectionTitle>{t("user.my-ticket")}</SectionTitle>
          <div className="px-8 my-4 w-full h-full block">
            {status === "loading"
              ? [...Array(3)].map((i) => (
                  <Skeleton style={{ height: 400, width: "100%" }} />
                ))
              : [...tickets]
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
            {isNotEmpty(tickets) && (
              <Pagination
                current={currentPage + 1}
                onChange={onChange}
                total={tickets.length}
                pageSize={3}
                defaultCurrent={1}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedTickets;
