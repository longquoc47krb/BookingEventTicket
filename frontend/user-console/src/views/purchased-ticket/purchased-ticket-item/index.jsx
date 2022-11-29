import React from "react";
import { useEventDetails } from "../../../api/services/eventServices";
import { MdAccessTime } from "react-icons/md";
import { convertMongodbTimeToString } from "../../../utils/utils";
import { t } from "i18next";
import QRCodeComponent from "../../../components/qrcode";
import { useFindOrganizerById } from "../../../api/services/organizationServices";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/slices/accountSlice";
import { BsFillCalendarCheckFill, BsPersonLinesFill } from "react-icons/bs";
import { IoLocationSharp, IoTicket } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { GrPaypal } from "react-icons/gr";
import InfoCollapse from "../../../assets/info-collapse";
import Table from "../../../components/common/table";
import AppConfig from "../../../configs/AppConfig";
const { ORDER_HEADER, BUYER_HEADER } = AppConfig;
const dataTable = [
  {
    fullName: "Francisco Mendes",
    role: "Full Stack",
  },
  {
    fullName: "Ricardo Malva",
    role: "Social Media Manager",
  },
];

function PurchaseTicketItem(props) {
  const { data } = props;
  const { customerTicketList } = data;
  const user = useSelector(userInfoSelector);
  const { data: event, status: eventStatus } = useEventDetails(data.idEvent);
  const { data: organizer, status: organizerStatus } = useFindOrganizerById(
    event?.host_id
  );
  const HeadingList = [
    {
      icon: <IoTicket />,
      text: "ticket.booking-id",
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
              <InfoCollapse item={HeadingList[2]}>3</InfoCollapse>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PurchaseTicketItem;
