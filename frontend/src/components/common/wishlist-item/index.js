import React from "react";

function WishListItem({ event }) {
  return (
    <div className="flex items-start gap-x-2 w-[30rem]">
      <img src={event.background} className="w-28 h-auto" alt={event.name} />
      <div className="flex flex-col w-full">
        <span className="font-semibold text-lg inline-block w-[350px] text-ellipsis overflow-hidden">
          {event.name}
        </span>
        <span>{event.venue}</span>
      </div>
    </div>
  );
}

export default WishListItem;
