import PropTypes from "prop-types";

const Badge = (props) => {
  const { children, count } = props;
  return (
    <>
      {count !== 0 ? (
        <div
          className="text-white bg-red-500 text-[12px] rounded-full absolute top-0 right-0 z-10 w-5 h-5 text-center"
          style={{ transform: "translate(9px, -15px)" }}
        >
          {count}
        </div>
      ) : null}
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
