/* eslint-disable no-undef */
import React from "react";
import SearchBox from "../../presentation/searchbox";
function HeroBanner() {
  return (
    <div
      className='h-[245px] bg-red-400 justify-center items-center flex flex-col'
      style={{
        backgroundImage: 'url("/hero.jpg")',
      }}>
      <h1 className='text-2xl text-white font-bold'>
        Thế giới sự kiện đặc sắc
      </h1>
      <SearchBox
        width={700}
        placeholder='Tìm kiếm sự kiện, khu vui chơi, khoá học'
      />
    </div>
  );
}

export default HeroBanner;
