import React from "react";

function OrderRowItem(props) {
  const { first, second } = props;
  return (
    <>
      <h1 className="text-xl font-semibold">{first}</h1>
      <h1 className="text-xl font-medium text-right">{second}</h1>
    </>
  );
}

export default OrderRowItem;
