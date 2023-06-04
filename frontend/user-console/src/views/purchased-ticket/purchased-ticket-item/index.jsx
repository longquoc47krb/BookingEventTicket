import { t } from "i18next";
import React from "react";
import { BsFillCalendarCheckFill, BsPersonLinesFill } from "react-icons/bs";
import { GrPaypal } from "react-icons/gr";
import { HiIdentification } from "react-icons/hi2";
import { IoLocationSharp, IoTicket } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  useEventDetails,
  useFetchOrganizerByEventId,
} from "../../../api/services/eventServices";
import VNPayLogo from "../../../assets/vnpay.svg";
import Table from "../../../components/common/table";
import OrderTable from "../../../components/common/table/order-table";
import Download from "../../../components/export";
import InfoCollapse from "../../../components/info-collapse";
import AppConfig from "../../../configs/AppConfig";
import { userInfoSelector } from "../../../redux/slices/accountSlice";
import { convertMongodbTimeToString } from "../../../utils/utils";
import TicketItem from "../ticket";
const { ORDER_HEADER, BUYER_HEADER, ORDER_TABLE_HEADER } = AppConfig;

function PurchaseTicketItem(props) {
  const { data } = props;
  const { customerTicketList } = data;
  console.log({ customerTicketList });
  const user = useSelector(userInfoSelector);
  const { data: event, isLoading: eventLoading } = useEventDetails(
    data.idEvent
  );
  const { data: organizer, isLoading: organizerLoading } =
    useFetchOrganizerByEventId(data.idEvent);
  const isMobile = useMedia("(max-width: 767px)");
  const navigate = useNavigate();
  const HeadingList = [
    {
      icon: <HiIdentification />,
      text: "ticket.booking",
      value: data.id,
    },
    {
      icon: <BsPersonLinesFill />,
      text: "ticket.buyer-info",
    },
    {
      icon: <TbFileInvoice />,
      text: "ticket.order-info",
    },
    {
      icon: <IoTicket />,
      text: "ticket.ticket-detail",
    },
  ];
  const OrderData = [
    {
      orderTime: (
        <div className="flex gap-x-2 items-center text-black text-sm font-medium">
          <MdAccessTime />
          <span className="font-thin">{t("ticket.createdAt")}</span>
          {convertMongodbTimeToString(data.createdDate)}
        </div>
      ),
      paymentMethod:
        customerTicketList[0].currency === "USD" ? (
          <p className="flex items-center gap-x-4">
            <GrPaypal color="#3b7bbf" />
            Paypal
          </p>
        ) : (
          <p className="flex items-center gap-x-4">
            <img
              src={VNPayLogo}
              style={{ height: 48, width: "auto" }}
              alt="vnpay"
            />
            VNPay
          </p>
        ),
    },
  ];
  const BuyerData = [
    {
      fullName: user.name,
      email: user.email,
      phone: user.phone,
    },
  ];
  return (
    <>
      <div
        className={
          isMobile
            ? "text-white text-base font-medium w-[calc(100%-2rem)] bg-[#1f3e82] px-4 py-2 mt-8 card"
            : " text-white text-2xl font-medium w-[calc(100%-2rem)] bg-[#1f3e82] px-4 py-2 mt-8 card"
        }
      >
        <div className="flex items-center gap-x-4 flex-row">
          <MdAccessTime />
          <p className={isMobile ? "font-thin text-base" : "font-thin"}>
            {t("ticket.createdAt")}
          </p>
          <p>{convertMongodbTimeToString(data.createdDate)}</p>
        </div>
      </div>
      {eventLoading || organizerLoading ? (
        <Skeleton width={"90vw"} height={"25rem"} />
      ) : (
        <div className="mb-4 w-[calc(100%-2rem)] min-h-[25rem] relative p-4 rounded-[1rem] card">
          <div className="flex flex-col w-full">
            <div
              className={
                isMobile
                  ? "block border-b-[1px] car border-[#aa9f9f] border-dashed"
                  : "flex items-center justify-start border-b-[1px] border-[#aa9f9f] border-dashed"
              }
            >
              <img
                src={organizer.avatar}
                className="h-[10rem] w-auto p-4 rounded-full"
                alt="logo event"
                onClick={() => navigate(`/organizer-profile/${organizer.id}`)}
              />
              <div>
                <p
                  className="text-base text-[#1f3e82] uppercase tracking-[0.5rem] mb-1 hover:underline hover:cursor-pointer"
                  onClick={() => navigate(`/organizer-profile/${organizer.id}`)}
                >
                  {organizer.name}
                </p>
                <h1
                  className="font-medium text-3xl  text-[#1f3e82] mb-2  gap-x-3 flex items-center"
                  onClick={() => navigate(`/event/${data.idEvent}`)}
                >
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[80vw] hover:underline hover:cursor-pointer">
                    {event?.name}
                  </span>{" "}
                  {/* <EventBadge status={event.status} date={event.startingDate} /> */}
                </h1>
                <p className="text-base text-[#1f3e82] text-ellipsis overflow-hidden flex items-center gap-x-3">
                  <BsFillCalendarCheckFill />
                  <p>
                    {event.startingDate} - {event.startingTime}
                  </p>
                  {/* {convertMongodbTimeToString(data.createdDate)} */}
                </p>
                <span className="text-base text-[#1f3e82] text-ellipsis overflow-hidden flex items-center gap-x-3">
                  <IoLocationSharp fontSize={isMobile && "2rem"} />
                  <p>
                    {event.venue} - {event.venue_address}
                  </p>
                </span>
              </div>
            </div>
            <div className="block w-full">
              <InfoCollapse item={HeadingList[0]}>
                <Table columns={ORDER_HEADER} data={OrderData} />
              </InfoCollapse>
              <InfoCollapse item={HeadingList[1]}>
                {" "}
                <Table columns={BUYER_HEADER} data={BuyerData} />
              </InfoCollapse>
              <InfoCollapse item={HeadingList[2]}>
                <OrderTable
                  header={ORDER_TABLE_HEADER}
                  bodyData={customerTicketList}
                />
              </InfoCollapse>
              <InfoCollapse item={HeadingList[3]}>
                <div id="ticketItem">
                  <TicketItem data={data} id={data.id} />
                </div>

                <Download bookingId={data.id} />
              </InfoCollapse>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PurchaseTicketItem;
