/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Popover } from "antd";
import { Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  roleSelector,
  setUserProfile,
  userInfoSelector,
} from "../redux/slices/accountSlice";
import accountServices, {
  useFetchUserInfo,
} from "../api/services/accountServices";
import organizationServices, {
  useFetchOrganizerByEmail,
} from "../api/services/organizationServices";
import { ROLE } from "../utils/constants";
const { getOrganizerByEmail } = organizationServices;
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const user = useSelector(userInfoSelector);
  const [open, setOpen] = useState(false);
  const { data: userData, status } = useFetchOrganizerByEmail(user.email);
  const dispatch = useDispatch();
  const role = useSelector(roleSelector);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  useEffect(() => {
    const fetchUserInfor = async () => {
      const response = await getOrganizerByEmail(user.email);
      return response.status === 200 && dispatch(setUserProfile(response.data));
    };
    fetchUserInfor();
  }, [userData]);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <Popover
          content={<UserProfile setOpen={setOpen} />}
          trigger="click"
          open={open}
          placement="bottomRight"
          onOpenChange={handleOpenChange}
        >
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            {role === ROLE.Admin ? null : (
              <img
                className="rounded-sm w-8 h-8 object-cover"
                src={user.avatar}
                alt="user-profile"
              />
            )}
            <p className="flex items-center gap-x-1 mb-0">
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-primary font-bold ml-1 text-14">
                {user.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Popover>
        {isClicked.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
