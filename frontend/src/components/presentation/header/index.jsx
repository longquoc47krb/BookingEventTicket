/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
function Header() {
  return (
    <div className='h-[42px] text-white px-5 bg-black marker:shadow-md flex items-center justify-between'>
      <img
        className='w-[30px] h-auto'
        src={process.env.PUBLIC_URL + "ticketLogo.png"}
      />
      <div className='auth flex justify-center gap-x-1 text-white'>
        <a className='text-white border-r-2 border-white px-3 hover:text-primary'>
          Đăng nhập
        </a>
        <a className='text-white px-3 hover:text-primary'>Đăng ký</a>
      </div>
    </div>
  );
}

export default Header;
