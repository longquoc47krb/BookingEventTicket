import React from "react";
import { useEventDetails } from "../../../api/services/eventServices";
import { convertMongodbTimeToString } from "../../../utils/utils";
import { t } from "i18next";
import QRCodeComponent from "../../../components/qrcode";
import { useFindOrganizerById } from "../../../api/services/organizationServices";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/slices/accountSlice";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
function PurchaseTicketItem(props) {
  const { data } = props;
  const { customerTicketList } = data;
  const user = useSelector(userInfoSelector);
  const { data: event, status: eventStatus } = useEventDetails(data.idEvent);
  const { data: organizer, status: organizerStatus } = useFindOrganizerById(
    event?.host_id
  );
  return (
    <>
      {eventStatus === "success" && (
        <div
          className="mb-4 w-[calc(100%-2rem)] h-[25rem] relative p-4 rounded-[1rem] ticket-item flex"
          style={{
            background: `linear-gradient(178deg, rgb(16, 30, 62), rgb(0 0 0 / 83%)), url(${event.background})`,
            backgroundSize: "contain",
          }}
        >
          <div className="flex flex-col w-[80%]">
            <span className="text-base text-yellow-300 uppercase tracking-[0.5rem] mb-1">
              {organizerStatus === "success" && organizer.name}
            </span>
            <span className="font-medium text-4xl inline-block text-ellipsis overflow-hidden text-white tracking-wider mb-2">
              {event.name}
            </span>
            <div className="grid grid-cols-2 w-full">
              <span className="text-white text-2xl text-ellipsis overflow-hidden tracking-[0.3rem] flex items-center gap-x-3">
                <BsFillCalendarCheckFill />
                <p>
                  {event.startingDate} - {event.startingTime}
                </p>
                {/* {convertMongodbTimeToString(data.createdDate)} */}
              </span>
              <span className="text-white text-2xl text-ellipsis overflow-hidden tracking-[0.3rem] flex items-center gap-x-3">
                <IoLocationSharp />
                <p>{event.venue}</p>
              </span>
              <div className="absolute bottom-6 left-6 flex justify-start gap-x-8 w-[80%]">
                <div className="text-white ">
                  <p className="text-lg tracking-[0.1rem] px-2 uppercase">
                    {t("ticket.customer")}
                  </p>
                  <p className="text-2xl font-semibold gilroy tracking-[0.15rem] w-auto px-2 py-1 rounded-md text-white">
                    {user.name}
                  </p>
                </div>
                <div className="text-white">
                  <p className="text-lg tracking-[0.1rem] px-2 uppercase">
                    {t("ticket.booking-id")}
                  </p>
                  <p className="text-2xl font-semibold gilroy tracking-[0.2rem]  w-auto px-2 py-1 rounded-md text-white">
                    {data.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1 h-full border-l-2 border-gray-400 border-dashed"></div>
          <div className="absolute right-6 bottom-20 border-2 border-white">
            <QRCodeComponent value={data.id} logo={organizer?.avatar} />
          </div>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="w-[100px] absolute top-4 right-4"
            alt="logo"
          />
        </div>
      )}
    </>
  );
}

export default PurchaseTicketItem;