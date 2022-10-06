import React from "react";

function SectionTitle({ children, className }) {
  return (
    <h1 className={`text-left home-popular-text typo ${className}`}>
      {children}
    </h1>
  );
}

export default SectionTitle;
