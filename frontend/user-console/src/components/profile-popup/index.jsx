/* eslint-disable quotes */
/* eslint-disable import/order */
import React from "react";
import { MdExitToApp, MdOutlineCancel } from "react-icons/md";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../configs/AppConfig";
import {
  logOutAccount,
  userInfoSelector,
} from "../../redux/slices/accountSlice";
const { USER_PROFILE_MENU } = AppConfig;
const UserProfile = ({ setOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutAccount());
  };

  return (
    <div className="nav-item bg-white dark:bg-[#42464D] p-4 rounded-lg w-96 shadow-sm shadow-slate-400">
      <div className="flex justify-end items-center">
        <MdOutlineCancel
          className="text-2xl rounded-full text-gray-500"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="flex gap-4 items-center border-color border-b-1 pb-4">
        <img
          className="rounded-full h-[100px] w-[100px] object-cover border-8 border-solid border-gray-200 shadow-md"
          src={user.avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-2xl text-[#1F3E82]"> {user.name}</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {user.email}
          </p>
        </div>
      </div>
      <hr></hr>
      <div>
        {USER_PROFILE_MENU.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="flex items-center text-black p-1 hover:bg-gray-200 cursor-pointer rounded-md "
          >
            <button
              type="button"
              className="text-lg flex items-center gap-x-3 justify-center rounded-lg p-3 hover:bg-light-gray "
            >
              {item.icon}
              {t(item.label)}
            </button>

            <div></div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <button
          className="primary-button text-xl flex items-center gap-x-1 justify-center"
          onClick={handleLogout}
        >
          <MdExitToApp />
          {t("user.logout")}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
