import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useEventDetails } from "../../../api/services/eventServices";
import { useUserActionContext } from "../../../context/UserActionContext";
import { removeEventToWishList } from "../../../redux/slices/eventSlice";
import theme from "../../../shared/theme";

function WishListItem({ id }) {
  const [interest, setInterest] = useState(true);
  const { removeFromWishlist } = useUserActionContext();
  const { data: eventQuery, status, isFetching } = useEventDetails(id);
  console.log({ id });

  if (status === "loading" || isFetching) {
    return null;
  } else if (status === "error" || isFetching) {
    return null;
  } else {
    const event = eventQuery.data;
    return (
      <div
        className="flex items-start gap-x-2 w-[30rem] relative"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img src={event.background} className="w-28 h-auto" alt={event.name} />
        <div className="flex flex-col w-full">
          <span className="font-semibold text-lg inline-block w-[350px] text-ellipsis overflow-hidden">
            {event.name}
          </span>
          <span>{event.venue}</span>
        </div>
        {interest && (
          <div
            className="absolute right-2 top-4"
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
