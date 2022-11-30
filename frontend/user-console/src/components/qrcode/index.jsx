import React from "react";
import { useQRCode } from "next-qrcode";

function QRCodeComponent(props) {
  const { value, logo } = props;
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
