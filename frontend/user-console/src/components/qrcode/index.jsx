import React from "react";
import QRCode from "qrcode-react";

function QRCodeComponent(props) {
  const { value, logo } = props;

  return <QRCode value={value} size={128} logo={logo} logoWidth={48} />;
}

export default QRCodeComponent;
