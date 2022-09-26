import React from "react";
import placeholderImg from "../../../assets/fallback-avatar.png";

const Avatar = ({ className, avatar }) => {
  return (
    <img
      className={`rounded-full object-cover ${className}`}
      src={avatar || placeholderImg}
      alt="placeholder"
    ></img>
  );
};

export default Avatar;
