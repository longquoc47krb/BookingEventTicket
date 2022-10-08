import React from "react";
import Empty from "../../assets/Empty.svg";
import PropTypes from "prop-types";
function EmptyData({ text }) {
  return (
    <div className="w-[50vw] flex justify-center items-center flex-col">
      <img src={Empty} className="w-[20rem] h-[20rem]" alt="empty" />
      <span className="text-2xl font-semibold mb-5">{text}</span>
    </div>
  );
}
EmptyData.propTypes = {
  text: PropTypes.string,
};
EmptyData.defaultProps = {
  text: "Hổng thấy gì hết trơn :&lt;",
};
export default EmptyData;
