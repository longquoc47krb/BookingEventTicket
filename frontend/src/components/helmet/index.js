import React from "react";
import { Helmet } from "react-helmet";

function HelmetHeader(props) {
  const { title, content } = props;
  return (
    <Helmet>
      <title>
        {title}
        {` | Lotuticket`}
      </title>
      <meta name="description" content={content} />
    </Helmet>
  );
}

export default HelmetHeader;
