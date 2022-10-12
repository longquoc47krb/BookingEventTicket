import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src={process.env.PUBLIC_URL + "/logo-color.png"}
        class="mr-3 h-12"
        alt="Lotus Ticket Logo"
      />
      <div className="progress"></div>
    </div>
  );
};

export default Loading;
