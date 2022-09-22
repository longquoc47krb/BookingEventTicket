import React from "react";
import { Helmet } from "react-helmet";

function HelmetHeader(props) {
  const { title, content } = props;
  return (
    <Helmet>
      <title>
        {title}
        {` | Lotus Ticket`}
      </title>
      <meta name="description" content={content} />
    </Helmet>
  );
}

export default HelmetHeader;
