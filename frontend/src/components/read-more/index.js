import parse from "html-react-parser";
import React, { useRef, useState } from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
function ReadMoreLess(props) {
  const { children, className, ref } = props;
  const [expanded, setExpanded] = useState(false);
  const readmoreRef = useRef(null);
  const handleReadMoreLess = (event) => {
    if (event.currentTarget.classList.contains("expand")) {
      event.currentTarget.classList.remove("expand");
      readmoreRef.current.classList.remove("expand");
      setExpanded(false);
    } else {
      event.currentTarget.classList.add("expand");
      readmoreRef.current.classList.add("expand");
      setExpanded(true);
    }
  };
  return (
    <div className={`readmore ${className}`} ref={readmoreRef}>
      <div ref={ref}>{parse(children)}</div>
      <div className="readmore-link" onClick={handleReadMoreLess}>
        {expanded ? (
          <BsChevronDoubleUp
            fontSize={30}
            className="flex justify-center w-full "
            onClick={(e) => e.preventDefault()}
          />
        ) : (
          <BsChevronDoubleDown
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
