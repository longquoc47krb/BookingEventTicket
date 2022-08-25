/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Tag, Image } from "antd";
import Calendar from "../../presentation/calendar";
function Event({ event }) {
  return (
    <div className='w-[360px] h-[260px] shadow-md shadow-gray-200 p-2 relative'>
      <Image
        src={process.env.PUBLIC_URL + "hero.jpg"}
        style={{ height: 130 }}
      />
      <h1 className='w-[290px] font-bold'>
        Workshop HÀ NỘI: Ứng dụng Total Rewards trong phát triển bộ GEN VHDN
      </h1>
      <div>
        Từ <strong>50.000 VND</strong>
      </div>
      <Tag>HỒ CHÍ MINH</Tag>
      <Calendar className='absolute right-5 bottom-5' />
    </div>
  );
}

export default Event;
