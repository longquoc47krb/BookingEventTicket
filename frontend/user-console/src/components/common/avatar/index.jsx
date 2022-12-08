import { Image } from "antd";
import React from "react";
import placeholderImg from "../../../assets/fallback-avatar.png";
import SKLoading from "../../loading/sk-loading";

const Avatar = ({ className, avatar, style, loading }) => {
  return (
    <div className="relative w-[120px] h-[120px] rounded-full">
      {loading && (
        <>
          {" "}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backdropFilter: "blur(0px)",
              width: "98%",
              height: "98%",
              background: "rgba( 0, 0, 0, 0.6 )",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.18)",
              zIndex: 1,
            }}
          ></div>
          <SKLoading className="absolute top-[35%] left-[35%] z-[3]" />
        </>
      )}
      <Image
        style={style}
        className={`rounded-full object-cover ${className}`}
        src={avatar || placeholderImg}
        alt="placeholder"
      />
    </div>
  );
};

export default Avatar;
