import React from "react";

const Item = ({ imageSrc, className }) => {
  return (
    <div className={className}>
      <div className="w-auto h-auto bg-gray-400 rounded-lg overlay">
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
