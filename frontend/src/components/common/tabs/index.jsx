import React, { useRef } from "react";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";
function Tabs(props) {
  const introduce = useRef(null);
  const info = useRef(null);
  const organization = useRef(null);
  const { tabs, className, scrollToSection } = props;
  return (
    <Nav
      variant="tabs"
      className={`${className} bg-white w-[100vw] px-[1.5rem]`}
    >
      {tabs.map((item, index) => (
        <Nav.Item>
          <Nav.Link onClick={() => scrollToSection(item.ref)}>
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      ref: PropTypes.object,
      label: PropTypes.string,
    })
  ),
};
Tabs.defaultProps = {
  tabs: [
    {
      ref: "introduce",
      label: "Giới thiệu",
    },
    {
      ref: "info",
      label: "Thông tin vé",
    },
    {
      ref: "organization",
      label: "Nhà tổ chức",
    },
  ],
};
export default Tabs;
