import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import $ from "jquery";
function ReadMoreLess(props) {
  const { children, className } = props;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    $(".readmore-link").click(function (e) {
      // record if our text is expanded
      var expanded = $(e.target).hasClass("expand");
      setExpanded(true);
      //close all open paragraphs
      $(".readmore.expand").removeClass("expand");
      $(".readmore-link.expand").removeClass("expand");
      // if target wasn't expand, then expand it
      if (!expanded) {
        $(e.target).parent(".readmore").addClass("expand");
        $(e.target).addClass("expand");
        setExpanded(false);
      }
    });
  }, []);
  return (
    <div className={`readmore ${className}`}>
      {parse(children)}
      <div className="readmore-link">
        {expanded ? (
          <BsChevronDoubleDown
            fontSize={30}
            className="flex justify-center w-full"
            onClick={(e) => e.preventDefault()}
          />
        ) : (
          <BsChevronDoubleUp
            fontSize={30}
            className="flex justify-center w-full"
            onClick={(e) => e.preventDefault()}
          />
        )}
      </div>
    </div>
  );
}

export default ReadMoreLess;
