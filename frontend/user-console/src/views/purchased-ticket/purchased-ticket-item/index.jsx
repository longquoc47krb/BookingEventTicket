import { t } from "i18next";
import React from "react";
import { BsFillCalendarCheckFill, BsPersonLinesFill } from "react-icons/bs";
import { GrPaypal } from "react-icons/gr";
import { HiIdentification } from "react-icons/hi2";
import { IoLocationSharp, IoTicket } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  useEventDetails,
  useFetchOrganizerByEventId,
} from "../../../api/services/eventServices";
import { useFindOrganizerById } from "../../../api/services/organizationServices";
import InfoCollapse from "../../../assets/info-collapse";
import Table from "../../../components/common/table";
import OrderTable from "../../../components/common/table/order-table";
import Download from "../../../components/export";
import AppConfig from "../../../configs/AppConfig";
import { userInfoSelector } from "../../../redux/slices/accountSlice";
import { convertMongodbTimeToString } from "../../../utils/utils";
import TicketItem from "../ticket";
const { ORDER_HEADER, BUYER_HEADER, ORDER_TABLE_HEADER } = AppConfig;

function PurchaseTicketItem(props) {
  const { data } = props;
  const { customerTicketList } = data;
  const user = useSelector(userInfoSelector);
  const { data: event, status: eventStatus } = useEventDetails(data.idEvent);
  const { data: organizer, status: organizerStatus } =
    useFetchOrganizerByEventId(event.id);
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
          "VNPay"
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
      <div className="flex gap-x-4 items-center text-white text-2xl font-medium w-[calc(100%-2rem)] bg-[#1f3e82] px-4 py-2 mb-4 mt-8">
        <MdAccessTime />
        <span className="font-thin">{t("ticket.createdAt")}</span>
        {convertMongodbTimeToString(data.createdDate)}
      </div>
      {eventStatus === "success" && (
        <div className="mb-4 w-[calc(100%-2rem)] min-h-[25rem] relative p-4 rounded-[1rem] ticket-item flex">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-start border-b-[1px] border-[#aa9f9f] border-dashed">
              <img
                src={organizerStatus === "success" && organizer.avatar}
                className="h-[10rem] w-auto p-4 rounded-full"
                alt="logo event"
              />
              <div>
                <p className="text-base text-[#1f3e82] uppercase tracking-[0.5rem] mb-1">
                  {organizerStatus === "success" && organizer.name}
                </p>
                <p className="font-medium text-3xl text-ellipsis overflow-hidden text-[#1f3e82] mb-2">
                  {event.name}
                </p>
                <p className="text-base text-[#1f3e82] text-ellipsis overflow-hidden flex items-center gap-x-3">
                  <BsFillCalendarCheckFill />
                  <p>
                    {event.startingDate} - {event.startingTime}
                  </p>
                  {/* {convertMongodbTimeToString(data.createdDate)} */}
                </p>
                <span className="text-base text-[#1f3e82] text-ellipsis overflow-hidden flex items-center gap-x-3">
                  <IoLocationSharp />
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
