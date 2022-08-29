/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import AppStyle from "../../../assets/AppStyle";
import { Avatar } from "antd";
function Header(props) {
  const { isAuthenticated } = props;
  return (
    <div className='h-[42px] text-white px-5 bg-black marker:shadow-md flex items-center justify-between'>
      <img
        className='w-[30px] h-auto'
        src={process.env.PUBLIC_URL + "ticketLogo.png"}
      />
      <div className='auth flex justify-center gap-x-1 text-white'>
        {!isAuthenticated ? (
          <>
            <a
              className='border-r-2 border-white px-3'
              style={{
                color: AppStyle.colors.text,
                "&:hover": { color: AppStyle.colors.primary },
              }}>
              Đăng nhập
            </a>
            <a
              className='px-3'
              style={{
                color: AppStyle.colors.text,
                "&:hover": { color: AppStyle.colors.primary },
              }}>
              Đăng ký
            </a>
          </>
        ) : (
          <Avatar
            style={{
              backgroundColor: AppStyle.colors.primary,
              verticalAlign: "middle",
              fontStyle: "bold",
            }}
            size='large'>
            L
          </Avatar>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  isAuthenticated: false,
};
export default Header;
