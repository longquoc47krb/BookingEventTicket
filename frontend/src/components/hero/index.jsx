/* eslint-disable no-undef */
import React from "react";
import SearchBox from "../common/searchbox";
import PropTypes from "prop-types";
function HeroBanner({ heroSlogan, heroBackground }) {
  return (
    <section
      role='img'
      aria-label='Image Description'
      className='hero-container'
      style={{
        backgroundImage: `url(${heroBackground})`,
      }}>
      <h1 className='hero-slogan'>{heroSlogan}</h1>
      <SearchBox width={700} />
    </section>
  );
}
HeroBanner.propTypes = {
  heroSlogan: PropTypes.string.isRequired,
  heroBackground: PropTypes.string.isRequired,
};
HeroBanner.defaultProps = {
  heroSlogan: "Thế giới đặc sắc",
  heroBackground: "https://source.unsplash.com/random/1300x400",
};
export default HeroBanner;
