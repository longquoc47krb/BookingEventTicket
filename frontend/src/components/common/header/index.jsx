/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import { BiLogOut } from "react-icons/bi";
function Header(props) {
  const { currentUser } = props;
  const { ROUTES } = AppConfig;
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(); //like here
  };
  const menu = (
    <Menu
      style={{
        width: "auto",
        textAlign: "left",
        display: "flex",
      }}
      items={[
        {
          icon: <BiLogOut />,
          label: <span onClick={clearLocalStorage}>Đăng xuất</span>,
          key: "0",
        },
      ]}
    />
  );
  return (
    <div className="header-container">
      <p className="website-logo" onClick={() => navigate("/")}></p>
      <div className="header-auth">
        {!currentUser ? (
          <>
            <Link to={ROUTES.LOGIN}>
              <a className="border-r-2 border-white px-3">Đăng nhập</a>
            </Link>
            <Link to="/event-detail">
              <a className="px-3">Đăng ký</a>
            </Link>
          </>
        ) : (
          <>
            <Dropdown overlay={menu} trigger={["click"]}>
              <strong className="inline-flex items-center bg-gray-100 px-5 py-1.5 rounded-full">
                <span className="text-base font-medium text-black">
                  {currentUser.family_name} {currentUser.given_name}
                </span>
                <Avatar
                  googleId={currentUser.sub}
                  src={currentUser.picture}
                  size="35"
                  round={true}
                  name={currentUser.family_name}
                  className="object-cover w-6 h-6 rounded-full ml-2.5 -mr-2.5"
                />
              </strong>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  currentUser: PropTypes.object,
  logo: PropTypes.string.isRequired,
};
Header.defaultProps = {
  currentUser: JSON.parse(localStorage.getItem("user")) ?? null,
  logo: process.env.PUBLIC_URL + "ticketLogo.png",
};
export default Header;
