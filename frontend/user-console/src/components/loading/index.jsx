import React from "react";
import LotusTicketLogo from "../logo";
const Loading = () => {
  window.scrollTo(0, 0);
  return (
    <div className="loading-container">
      <div class="loading-page">
        <LotusTicketLogo />
      </div>
    </div>
  );
};

export default Loading;
