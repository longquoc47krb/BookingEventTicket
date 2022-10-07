/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useFetchEvents } from "../../api/services/eventServices";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import SearchBox from "../common/searchbox";
function HeroBanner({ heroSlogan, heroBackground }) {
  // const events = useSelector(eventsSelector);
  const { data: events } = useFetchEvents();
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef();
  useHandleClickOutside(ref, () => setIsOpen(false));
  console.log("open: ", isOpen);
  return (
    <section
      role="img"
      aria-label="Image Description"
      className="hero-container"
    >
      <img className="hero-image" src={heroBackground} alt="img" />
      <h1 className="hero-slogan">{heroSlogan}</h1>

      <SearchBox ref={ref} expand={isOpen} data={events?.data} />
    </section>
  );
}
HeroBanner.propTypes = {
  heroSlogan: PropTypes.string.isRequired,
  heroBackground: PropTypes.string.isRequired,
};
HeroBanner.defaultProps = {
  heroSlogan: "Bạn chỉ việc nhập, tìm kiếm sự kiện cứ để tui ><",
  heroBackground:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
};
export default HeroBanner;
