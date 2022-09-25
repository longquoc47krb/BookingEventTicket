import React from "react";
import placeholderImg from "../../../assets/fallback-avatar.png";

const Avatar = ({ className, avatar }) => {
  return (
    // border-radius: 50%;
    // width:inherit;
    // height:inherit;
    // object-fit: cover;
    <img
      className={`rounded-full object-cover ${className}`}
      src={avatar || placeholderImg}
      alt="placeholder"
    ></img>
  );
};

export default Avatar;
