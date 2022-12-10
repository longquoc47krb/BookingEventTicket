import React from "react";
import { useQRCode } from "next-qrcode";
import { useMedia } from "react-use";

function QRCodeComponent(props) {
  const { value } = props;
  const { SVG } = useQRCode();
  return (
    <SVG
      text={value}
      options={{
        level: "M",
        margin: 2,
        scale: 4,
        width: 128,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }}
    />
  );
}

export default QRCodeComponent;
