/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {
  logOutGoogle,
  userInfoSelector,
} from "../../../redux/slices/googleSlice";
import { useDispatch, useSelector } from "react-redux";
function Header(props) {
  const { currentUser } = props;
  const { ROUTES } = AppConfig;
  const [current, setCurrent] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  useEffect(() => {
    setCurrent(userInfo);
  }, [userInfo]);
  const menu = (
    <Menu
      style={{
        width: "auto",
        textAlign: "left",
        fontWeight: 700,
        fontSize: "16px",
      }}
      items={[
        {
          icon: <CgProfile />,
          label: (
            <Link to="/profile">
              <span>Thông tin cá nhân</span>
            </Link>
          ),
        },
        {
          icon: <BiLogOut />,
          label: (
            <span
              onClick={() => {
                setTimeout(() => {
                  dispatch(logOutGoogle());
                  localStorage.clear();
                }, 1000);
              }}
            >
              Đăng xuất
            </span>
          ),
          key: "0",
        },
      ]}
    />
  );
  return (
    <div className="header-container">
      {/* <p className="website-logo" onClick={() => navigate("/")}></p> */}
      <img
        src="/logo.png"
        alt="logo"
        className="brand-logo"
        onClick={() => navigate("/")}
      />
      <div className="header-auth">
        {!current ? (
          <>
            <Link to={ROUTES.LOGIN}>
              <a className="border-r-2 border-white px-3">Đăng nhập</a>
            </Link>
            <Link to="/event/:id">
              <a className="px-3">Đăng ký</a>
            </Link>
          </>
        ) : (
          <>
            <Dropdown overlay={menu} trigger={["click"]}>
              <strong className="inline-flex items-center px-3 py-1.5">
                <span className="text-base font-medium text-white">
                  {current.family_name} {current.given_name}
                </span>
                <Avatar
                  googleId={current.sub}
                  src={current.picture}
                  size="35"
                  round={true}
                  name={current.family_name}
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
};
Header.defaultProps = {
  currentUser: JSON.parse(localStorage.getItem("userInfo")) ?? null,
};
export default Header;
