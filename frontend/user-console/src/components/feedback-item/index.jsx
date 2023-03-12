import { MenuItem, Rating, Select } from "@mui/material";
import { Popover } from "antd";
import { t } from "i18next";
import React, { useState } from "react";
import UserProfile from "../profile-popup";
import { BsThreeDotsVertical } from "react-icons/bs";
function FeedbackComment({
  name,
  rate,
  message,
  avatar,
  isCurrentUser = false,
}) {
  const [open, setOpen] = useState(false);
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

      <div className="absolute right-4 top-1">
        {isCurrentUser && (
          <Popover
            content={
              <ul>
                <li className="py-2 px-3 hover:bg-slate-400 hover:text-white rounded-sm cursor-pointer">
                  Edit
                </li>
                <li className="py-2 px-3 hover:bg-slate-400 hover:text-white rounded-sm cursor-pointer">
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
