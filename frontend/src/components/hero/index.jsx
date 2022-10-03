/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { eventsSelector } from "../../redux/slices/eventSlice";
import SearchBox from "../common/searchbox";
function HeroBanner({ heroSlogan, heroBackground }) {
  const events = useSelector(eventsSelector);
  return (
    <section
      role="img"
      aria-label="Image Description"
      className="hero-container"
    >
      <img className="hero-image" src={heroBackground} alt="img" />
      <h1 className="hero-slogan">{heroSlogan}</h1>
      {/* <Search data={events} /> */}
      <SearchBox
        data={events || null}
        placeholder="Tìm kiếm sự kiện theo tên, địa chỉ, thể loại,..."
      />
    </section>
  );
}
HeroBanner.propTypes = {
  heroSlogan: PropTypes.string.isRequired,
  heroBackground: PropTypes.string.isRequired,
};
HeroBanner.defaultProps = {
  heroSlogan: "Thế giới giải trí đặc sắc",
  heroBackground:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
};
export default HeroBanner;
