import React from "react";
import Empty from "../../assets/Empty.svg";
function EmptyData() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <img src={Empty} className="w-[20rem] h-[20rem]" alt="empty" />
      <span className="text-2xl font-semibold mb-5">
        Hổng thấy gì hết trơn :&lt;
      </span>
    </div>
  );
}

export default EmptyData;
