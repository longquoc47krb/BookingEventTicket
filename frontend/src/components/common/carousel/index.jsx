import { Carousel as CarouselBootstrap } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppUtils } from "../../../utils/AppUtils";
import { setSelectedEventName } from "../../../redux/slices/eventSlice";

const { toSlug } = AppUtils;
function Carousel(props) {
  const { data } = props;
  const newData = data?.map(({ id, name, background }) => ({
    id,
    name,
    background,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <CarouselBootstrap>
      {newData?.map((item, index) => (
        <CarouselBootstrap.Item interval={1000} key={item.id}>
          <img
            onClick={() => {
              dispatch(setSelectedEventName(item.name));
              navigate(`/event/${toSlug(item.name)}`);
            }}
            className="w-full h-auto p-[1rem]"
            src={item.background}
            alt={`carousel-${index}`}
          />
        </CarouselBootstrap.Item>
      ))}
    </CarouselBootstrap>
  );
}
Carousel.propTypes = {
  data: PropTypes.array,
};
Carousel.defaultProps = {};

const mapStateToProps = (state) => ({
  data: state.event.events,
});
export default connect(mapStateToProps)(Carousel);
