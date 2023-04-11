import { Rating } from "@mui/material";
import { Popover } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { updateRating } from "../../redux/slices/eventSlice";
import { hideBadWords } from "../../utils/badwords";
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
            <p className="font-semibold text-lg">{name}</p>
            <span className="text-gray-500 text-base">{time}</span>
          </div>
          <Rating
            name="size-small"
            value={rate}
            precision={0.5}
            readOnly
            size="small"
          />
          <p className="text-lg font-medium mt-2">{message}</p>
        </div>
      </div>

      <div className="absolute right-4 top-1">
        {isCurrentUser && (
          <Popover
            content={
              <ul>
                <li
                  className="py-2 px-3 hover:bg-slate-400 hover:text-white rounded-sm cursor-pointer"
                  onClick={() => {
                    setIsEditing(true);
                    dispatch(
                      updateRating({
                        star: rate,
                        message: hideBadWords(message),
                      })
                    );
                  }}
                >
                  Edit
                </li>
                <li
                  className="py-2 px-3 hover:bg-slate-400 hover:text-white rounded-sm cursor-pointer"
                  onClick={onDelete}
                >
                  Delete
                </li>
              </ul>
            }
            trigger="click"
            open={open}
            placement="bottomRight"
            onOpenChange={(newOpen) => setOpen(newOpen)}
          >
            <BsThreeDotsVertical className="cursor-pointer" />
          </Popover>
        )}
      </div>
    </div>
  );
}

export default FeedbackComment;
