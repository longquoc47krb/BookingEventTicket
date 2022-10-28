import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import PropTypes from "prop-types";
import theme from "../../shared/theme";
const ScrollToTopPage = ({ top }) => {
  return (
    <ScrollToTop
      smooth
      style={{ background: theme.main, width: 40, height: 40 }}
      top={top}
      className="heartbeat mb-16"
      component={
        <button className="text-white text-[1.5rem] ">
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
  top: 10000,
};
export default ScrollToTopPage;
