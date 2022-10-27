import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEventDetails } from "../../../api/services/eventServices";
import { useUserActionContext } from "../../../context/UserActionContext";
import theme from "../../../shared/theme";

function WishListItem({ id }) {
  const [interest] = useState(true);
  const { removeFromWishlist } = useUserActionContext();
  const navigate = useNavigate();
  const { data: event, status, isFetching } = useEventDetails(id);

  if (status === "loading" || isFetching) {
    return null;
  } else if (status === "error" || isFetching) {
    return null;
  } else {
    return (
      <div className="flex items-start gap-x-2 w-[30rem] relative shadow-md p-1 rounded-[1rem]">
        <img
          src={event.background}
          className="w-32 h-20 object-cover mr-1 rounded-[1rem]"
          alt={event.name}
        />
        <div className="flex flex-col w-full">
          <span className="font-semibold text-lg inline-block w-[250px] text-ellipsis overflow-hidden">
            {event.name}
          </span>
          <span>{event.startingDate}</span>
          <span>{event.venue}</span>
        </div>
        {interest && (
          <div
            className="absolute right-2 bottom-2"
            onClick={(e) => {
              e.stopPropagation();
              removeFromWishlist(event.id);
            }}
          >
            <BsSuitHeartFill fontSize={30} color={theme.main} />
          </div>
        )}
      </div>
    );
  }
}

export default WishListItem;
