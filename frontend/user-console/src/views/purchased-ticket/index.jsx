import React from "react";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import { MdAccessTime } from "react-icons/md";
import Empty from "../../assets/Empty.svg";
import Footer from "../../components/common/footer";
import SectionTitle from "../../components/common/section-title";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { useGetOrderListByUserId } from "../../api/services/orderServices";
import { map } from "lodash";
import PurchaseTicketItem from "./purchased-ticket-item";
import Skeleton from "react-loading-skeleton";
import { isEmpty, convertMongodbTimeToString } from "../../utils/utils";
import { useTranslation } from "react-i18next";
const PurchasedTickets = () => {
  const user = useSelector(userInfoSelector);
  const { data: tickets, status, isLoading } = useGetOrderListByUserId(user.id);
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
              : tickets
                  .reverse()
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedTickets;
