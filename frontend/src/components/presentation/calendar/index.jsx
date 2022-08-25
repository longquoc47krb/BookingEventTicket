import React from "react";

function Calendar(props) {
  const { className } = props;
  return (
    <div
      className={`w-[48px] h-auto bg-white shadow-lg text-center ${className}`}>
      <div className='h-[14px] bg-red-600'>
        <h1 className='text-white font-semibold text-[7px]'>THÁNG 8</h1>
      </div>
      <h1 className='text-[14px]'>24</h1>
      <h1 className='text-[7px] text-black'>THỨ TƯ</h1>
    </div>
  );
}

export default Calendar;
