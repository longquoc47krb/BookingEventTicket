import { Image } from "antd";
import React from "react";
import placeholderImg from "../../../assets/fallback-avatar.png";

const Avatar = ({ className, avatar, style }) => {
  return (
    <Image
      style={style}
      className={`rounded-full object-cover ${className}`}
      src={avatar || placeholderImg}
      alt="placeholder"
    />
  );
};

export default Avatar;
