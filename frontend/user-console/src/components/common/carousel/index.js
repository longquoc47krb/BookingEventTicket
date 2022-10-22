import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import { shuffle } from "lodash";
import { Link } from "react-router-dom";
import { checkImageURL } from "../../../utils/utils";
import PlaceholderCover from "../../../assets/cover-fallback.jpg";
export default function Carousel(props) {
  const { data } = props;
  var newData = [];
  newData = shuffle(data)
    .slice(0, 5)
    .map(({ id, background }) => ({
      id,
      background,
    }));
  console.log({ newData });
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        effect={"fade"}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {newData.map((event, index) => (
          <SwiperSlide>
            <Link to={`/event/${event.id}`} target="_blank">
              <img
                className="w-full h-auto px-0"
                src={event.background}
                alt={`carousel-${index}`}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
