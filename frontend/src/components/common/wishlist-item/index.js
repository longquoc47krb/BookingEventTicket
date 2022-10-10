import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEventToWishList,
  wishlistSelector,
} from "../../../redux/slices/wishlistSlice";
import theme from "../../../shared/theme";

function WishListItem({ event }) {
  const [interest, setInterest] = useState(true);
  const dispatch = useDispatch();
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
      {interest ? (
        <div
          className="absolute right-2 top-5"
          onClick={(e) => {
            e.stopPropagation();
            setInterest(!interest);
            dispatch(removeEventToWishList(event.id));
            window.location.reload();
          }}
        >
          <AiFillHeart fontSize={30} color={theme.main} />
        </div>
      ) : (
        <div
          className="absolute right-2 top-5"
          onClick={(e) => {
            e.stopPropagation();
            setInterest(!interest);
          }}
        >
          <AiOutlineHeart fontSize={30} color={theme.main} />
        </div>
      )}
    </div>
  );
}

export default WishListItem;
