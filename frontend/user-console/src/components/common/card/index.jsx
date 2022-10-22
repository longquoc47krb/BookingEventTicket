import React from "react";
import { Card as AntdCard } from "antd";
import ReadMore from "../read-more";
function Card(props) {
  const { title, ref, className, content } = props;
  return (
    <div className="event-detail-content">
      <div ref={ref} className={className}>
        {title}
      </div>
      <ReadMore>{content}</ReadMore>
    </div>
  );
}

export default Card;
