import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import PropTypes from "prop-types";
import { AppConfig } from "../../../configs/AppConfig";

const Background = (props) => {
  const { images } = props;

  return (
    <div>
      <Fade arrows={false}>
        {images.map((each, index) => (
          <div key={index} style={{ width: "100%" }}>
            <img
              alt=""
              className="slideshow-conatiner-images"
              style={{ objectFit: "cover", width: "100%" }}
              src={each}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
};
Background.propTypes = {
  images: PropTypes.array,
};
Background.defaultProps = {
  images: AppConfig.LOGIN_BACKGROUND,
};
export default Background;
