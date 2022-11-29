import React from "react";
import { useBarcode } from "next-barcode";

function Barcode(props) {
  const { value } = props;
  const { inputRef } = useBarcode({
    value,
    options: {
      displayValue: false,
      background: "#ffffff",
    },
  });

  return <svg ref={inputRef} />;
}

export default Barcode;
