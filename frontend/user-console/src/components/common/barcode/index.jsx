import React from "react";
import { useBarcode } from "next-barcode";

function Barcode(props) {
  const { value } = props;
  const { inputRef } = useBarcode({
    value,
    options: {
      height: 50,
    },
  });

  return <svg ref={inputRef} />;
}

export default Barcode;
