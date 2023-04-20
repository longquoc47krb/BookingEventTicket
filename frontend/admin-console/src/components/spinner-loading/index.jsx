import React from "react";

function SpinnerLoading() {
  return (
    <div className="relative">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default SpinnerLoading;
