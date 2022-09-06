/* eslint-disable no-undef */
import React from "react";
import SearchBox from "../common/searchbox";
import PropTypes from "prop-types";
function HeroBanner({ heroSlogan, heroBackground }) {
  return (
    <section
      role='img'
      aria-label='Image Description'
      className='hero-container'>
      <img className='hero-image' src={heroBackground} alt='img' />
      <h1 className='hero-slogan'>{heroSlogan}</h1>
      <SearchBox className='hero-search' />
    </section>
  );
}
HeroBanner.propTypes = {
  heroSlogan: PropTypes.string.isRequired,
  heroBackground: PropTypes.string.isRequired,
};
HeroBanner.defaultProps = {
  heroSlogan: "Thế giới đặc sắc",
  heroBackground:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80",
};
export default HeroBanner;
