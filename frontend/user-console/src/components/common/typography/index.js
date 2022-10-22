import React from "react";

function Typography({ children, className }) {
  return (
    <div className="relative">
      <h1 className={`typo ${className}`}>{children}</h1>
      <div className="typo-underline"></div>
    </div>
  );
}

export default Typography;
