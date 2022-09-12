import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 900) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <p className="flex items-center font-bold">
            ...Xem thêm
            <RiArrowDropDownLine />
          </p>
        ) : (
          <p className="flex items-center font-bold">
            ...Rút gọn
            <RiArrowDropUpLine />
          </p>
        )}
      </span>
    </p>
  );
};
export default ReadMore;
