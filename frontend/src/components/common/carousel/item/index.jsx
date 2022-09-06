import React from "react";

const Item = ({ imageSrc, className }) => {
  return (
    <div className={className}>
      <div className="w-[1000px] h-[380px] bg-gray-400 rounded-lg overlay">
        <img
          className="w-full h-full rounded-lg object-cover image "
          src={imageSrc}
          alt=""
        />
      </div>
    </div>
  );
};

export default Item;
