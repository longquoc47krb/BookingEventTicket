/* eslint-disable quotes */
/* eslint-disable import/order */
import React from "react";
import { useTranslation } from "react-i18next";
import { FaWallet } from "react-icons/fa";
import { MdExitToApp, MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppConfig from "../configs/AppConfig";
import {
  logOutAccount,
  roleSelector,
  userInfoSelector,
} from "../redux/slices/accountSlice";
import { ROLE } from "../utils/constants";
import { formatter } from "../utils/utils";
const { USER_PROFILE_MENU } = AppConfig;
const UserProfile = ({ setOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const role = useSelector(roleSelector);
  const handleLogout = () => {
    dispatch(logOutAccount());
  };

  return (
    <div className="nav-item bg-white dark:bg-[#42464D] p-2 rounded-lg w-96">
      <div className="flex justify-end items-center">
        <MdOutlineCancel
          className="text-2xl rounded-full text-gray-500"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="flex gap-4 items-start border-color border-b-1 pb-6 relative">
        {role === ROLE.Organizer ? (
          <img
            className="rounded-full h-[100px] w-[100px] object-cover border-8 border-solid border-gray-200 shadow-md"
            src={user.avatar}
            alt="user-profile"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            className="rounded-full h-[100px] w-[100px] object-cover border-8 border-solid border-gray-200 shadow-md"
          />
        )}
        <div>
          <p className="font-semibold text-2xl text-[#1F3E82] mb-1">
            {" "}
            {user.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {user.email}
          </p>
          {role === ROLE.Organizer && (
            <div className="mt-2 flex justify-start items-center gap-x-8">
              <div className="flex items-center gap-x-2">
                <>
                  <FaWallet color="#17AE17" fontSize={16} />
                  <span className="font-bold text-lg">
                    {formatter("USD").format(user.usdbalance)}
                  </span>
                </>
                <>
                  <FaWallet color="#17AE17" fontSize={16} />
                  <span className="font-bold text-lg">
                    {formatter("VND").format(user.vndbalance)}
                  </span>
                </>
              </div>
            </div>
          )}
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
