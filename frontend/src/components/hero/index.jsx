/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchEvents } from "../../api/services/eventServices";
import { useUserFetchDataContext } from "../../context/UserFetchDateContext";
import { useHandleClickOutside } from "../../hooks/useHandleClickOutside";
import SearchBox from "../common/searchbox";
function HeroBanner({ heroSlogan, heroBackground }) {
  const { t } = useTranslation();
  // const events = useSelector(eventsSelector);
  const { allEvents, successStatus } = useUserFetchDataContext();
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef();
  useHandleClickOutside(ref, () => setIsOpen(false));
  return (
    <section
      role="img"
      aria-label="Image Description"
      className="hero-container"
    >
      <img className="hero-image" src={heroBackground} alt="img" />
      <h1 className="hero-slogan">{t("event.hero-slogan")}</h1>

      <SearchBox
        ref={ref}
        expand={isOpen}
        data={successStatus && allEvents}
        placeholder={t("event.placeholder-searchbox")}
      />
    </section>
  );
}
HeroBanner.propTypes = {
  heroSlogan: PropTypes.string.isRequired,
  heroBackground: PropTypes.string.isRequired,
};
HeroBanner.defaultProps = {
  heroBackground:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
};
export default HeroBanner;
