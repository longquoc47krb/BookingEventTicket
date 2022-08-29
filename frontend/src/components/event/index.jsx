/* eslint-disable jsx-a11y/alt-text */
import { Image, Tag } from "antd";
import React from "react";
import Calendar from "../calendar";
function Event({ event }) {
  return (
    <div className='w-[360px] h-[260px] event-neumorphism p-2 relative'>
      <Image src={event?.image} style={{ height: 130, width: 360 }} />
      <h1 className='w-[290px] font-bold'>{event?.title}</h1>
      <div>
        <strong>{event?.price}</strong>
      </div>
      <Tag>{event?.address}</Tag>
      <Calendar className='absolute right-5 bottom-5' />
    </div>
  );
}

export default Event;
