/* eslint-disable jsx-a11y/alt-text */
import { Image, Tag } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../configs/AppConfig";
import { setSelectedEventName } from "../../redux/slices/eventSlice";
import { AppUtils } from "../../utils/AppUtils";
import Calendar from "../calendar";
import PlaceholderCover from "../../assets/cover-fallback.jpg";
import moment from "moment";
const { checkURL } = AppUtils;
function Event(props) {
  const { event } = props;
  const navigate = useNavigate();
  // const handleClickTag = (value) => {
  //   console.log("value", value);
  //   window.open(AppConfig.GOOGLE_SEARCH_BY_IMAGE(value));
  // };
  let categoriesArr = event?.eventCategoryList;
  // const [selectedId, setSelectedId] = useState(null);
  // const selectedTag = categoriesArr[selectedId];
  const dispatch = useDispatch();
  return (
    <div
      className="event-item-container"
      onClick={(e) => {
        e.preventDefault();
        dispatch(setSelectedEventName(event?.name));
        navigate(`/event/${event.name}`);
      }}
    >
      <Image
        src={checkURL(event?.background) ? event?.background : PlaceholderCover}
        style={{ height: 130, width: 360 }}
        onClick={(event) => event.stopPropagation()}
        className="event-item-image"
      />
      <h1 className="w-[calc(100%-80px)] font-bold event-title">
        {event.name}
      </h1>
      <div>
        <strong className="text-xl">{event.price}</strong>
      </div>
      <div className="flex items-center">
        {event.address ? (
          <Tag onClick={(event) => event.stopPropagation()}>
            {event.address}
          </Tag>
        ) : null}

        <BiCategory />
        {categoriesArr?.map((item, index) => (
          <p
            key={index}
            className="event-category"
            onClick={(event) => event.stopPropagation()}
          >
            {item?.name}
          </p>
        ))}
      </div>
      <Calendar
        className="absolute right-2 bottom-5"
        calendar={
          moment(event?.startingTime, "DD/MM/YYYY", true).isValid()
            ? event?.startingTime
            : "31/12/2022"
        }
      />
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
