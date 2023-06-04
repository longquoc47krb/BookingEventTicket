import { Rating } from "@mui/material";
import { Popover } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { hideBadWords } from "../../../utils/badwords";
import { updateRating } from "../../../redux/slices/eventSlice";
function FeedbackComment({
  name,
  rate,
  message,
  time,
  avatar,
  isCurrentUser = false,
  setIsEditing,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex mb-4 relative">
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
          <div className="flex items-center gap-x-2">
            <span className="font-semibold text-lg">{name}</span>
            <span className="text-gray-500 text-base">{time}</span>
          </div>
          <Rating
            name="size-small"
            value={rate}
            precision={0.5}
            readOnly
            size="small"
          />
          <p className="text-base font-medium mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackComment;
