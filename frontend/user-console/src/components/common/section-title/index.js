import React from "react";
import theme from "../../../shared/theme";

function SectionTitle({ children, className }) {
  return (
    // <Divider style={{ color: "black", border: "gray" }}>
    <h1
      className={`flex justify-center text-[${theme.main}] font-bold event-container-title`}
    >
      {children}
    </h1>
    // </Divider>
  );
}

export default SectionTitle;
