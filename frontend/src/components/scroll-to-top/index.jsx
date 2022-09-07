import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import AppStyle from "../../configs/AppStyle";
import PropTypes from "prop-types";
const ScrollToTopPage = ({ top }) => {
  return (
    <ScrollToTop
      smooth
      style={{ background: AppStyle.colors.primary, width: 50, height: 50 }}
      top={top}
      className="heartbeat mb-16"
      component={
        <button className="text-white text-[2rem] ">
          <BiArrowToTop />
        </button>
      }
    />
  );
};
ScrollToTopPage.propTypes = {
  top: PropTypes.number,
};
ScrollToTopPage.defaultProps = {
  top: 100,
};
export default ScrollToTopPage;
