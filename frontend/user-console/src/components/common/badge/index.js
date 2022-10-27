import PropTypes from "prop-types";

const Badge = (props) => {
  const { children, count } = props;
  return (
    <>
      {count !== 0 ? (
        <div className="relative p-3" onClick={(e) => e.stopPropagation()}>
          <div className="text-white bg-red-500 text-[12px] rounded-full absolute top-0 right-0 z-10 p-1">
            {count}
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </>
  );
};
Badge.defaultProps = {
  count: 0,
};
Badge.propTypes = {
  count: PropTypes.number,
};
export default Badge;
