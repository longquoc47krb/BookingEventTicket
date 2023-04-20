/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { useTranslation } from "react-i18next";

function GoogleMap({ event }) {
  const { t } = useTranslation();
  return (
    <div
      className="w-full bg-white h-[20rem] sticky 
                top-[48vh] py-2 px-4 event-detail-content"
    >
      <div className="introduce mx-0 pt-0 mb-2">{t("event.address")}</div>
      <iframe
        width="100%"
        height="80%"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${event?.venue_address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </div>
  );
}

export default GoogleMap;
