/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Marquee = ({ data }) => {
  const marqueeRef = useRef(null);
  const navigate = useNavigate();
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    let animationFrameId;

    const scroll = () => {
      setScrollPos((prevPos) => (prevPos + 1) % data.length);
      animationFrameId = requestAnimationFrame(scroll);
    };

    if (marqueeElement) {
      marqueeElement.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scroll);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollPos, data.length]);
  return (
    <div className="marquee-container overflow-hidden">
      <div className="marquee" ref={marqueeRef}>
        {data?.map((item, index) => (
          <img
            key={index}
            src={item.avatar}
            alt={`Image-${index}`}
            className="inline-block mr-4 hover:cursor-pointer"
            onClick={() => navigate(`/organizer-profile/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Marquee;
