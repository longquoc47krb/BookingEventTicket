import { Rating } from "@mui/material";
import React from "react";

function FeedbackComment({ name, rate, message, avatar }) {
  return (
    <div className="flex mb-4">
      <div className="flex gap-x-4 items-start w-full">
        <img
          src={avatar}
          style={{
            width: "5rem",
            aspectRatio: "1/1",
          }}
          alt="avatar"
        />
        <div className="flex flex-col gap-x-2 w-5/6">
          <p className="font-semibold text-lg">{name}</p>
          <Rating
            name="size-small"
            value={rate}
            precision={0.5}
            readOnly
            size="small"
          />
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackComment;
