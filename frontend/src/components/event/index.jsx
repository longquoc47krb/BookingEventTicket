/* eslint-disable jsx-a11y/alt-text */
import { Image, Tag } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { AppConfig } from "../../configs/AppConfig";
import Calendar from "../calendar";
function Event({ event }) {
  const handleClickTag = (value) => {
    console.log("value", value);
    window.open(AppConfig.GOOGLE_SEARCH_BY_IMAGE(value));
  };
  let categoriesArr = event.categories;
  // const [selectedId, setSelectedId] = useState(null);
  // const selectedTag = categoriesArr[selectedId];
  return (
    <div className="event-item-container ">
      <Image
        src={event?.image}
        style={{ height: 130, width: 360 }}
        className="event-item-image"
      />
      <h1
        className="w-[calc(100%-80px)] font-bold event-title"
        onClick={() => handleClickTag(event.title)}
      >
        {event.title}
      </h1>
      <div>
        <strong className="text-xl">{event.price}</strong>
      </div>
      <div className="flex items-center">
        {event.address ? (
          <Tag onClick={() => handleClickTag(event.address)}>
            {event.address}
          </Tag>
        ) : null}

        <BiCategory />
        {categoriesArr.map((item, index) => (
          <p
            key={index}
            onClick={() => handleClickTag(item)}
            className="event-category"
          >
            {item}
          </p>
        ))}
      </div>
      <Calendar className="absolute right-5 bottom-5" calendar={event.date} />
    </div>
  );
}
Event.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
  }),
};
Event.defaultProps = {
  event: PropTypes.shape({
    image: AppConfig.DEFAULT_PROPS.EVENT.image,
    title: AppConfig.DEFAULT_PROPS.EVENT.title,
    price: AppConfig.DEFAULT_PROPS.EVENT.price,
    categories: AppConfig.DEFAULT_PROPS.EVENT.categories,
  }),
};
export default Event;
