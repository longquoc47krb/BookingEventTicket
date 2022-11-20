import { Drawer } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../configs/AppConfig";
import { useUserActionContext } from "../../context/UserActionContext";
import { tokenSelector } from "../../redux/slices/accountSlice";
const { MOBILE_DRAWER, MOBILE_DRAWER_UNAUTHEN } = AppConfig;
function HomeDrawer(props) {
  const { toggleDrawer, onClose } = props;
  const navigate = useNavigate();
  const token = useSelector(tokenSelector);
  const { wishlist } = useUserActionContext();
  return (
    <div>
      {token ? (
        <Drawer anchor={"bottom"} open={toggleDrawer} onClose={onClose}>
          {MOBILE_DRAWER.map((item, index) => (
            <div
              key={index}
              onClick={
                item.link
                  ? () => navigate(item.link)
                  : item.function
                  ? () => {
                      onClose();
                      item.function();
                    }
                  : undefined
              }
              className="flex items-center text-black p-1 hover:bg-gray-200 cursor-pointer rounded-md "
            >
              <button
                type="button"
                className="text-lg flex items-center gap-x-3 justify-center rounded-lg p-3 hover:bg-light-gray "
              >
                {item.icon}
                {t(item.label)}
                {item.label === "user.wishlist" && wishlist.length > 0 && (
                  <span className="rounded-full h-6 w-6 bg-red-600 text-white font-semibold text-base self-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          ))}
        </Drawer>
      ) : (
        <Drawer anchor={"bottom"} open={toggleDrawer} onClose={onClose}>
          {MOBILE_DRAWER_UNAUTHEN.map((item, index) => (
            <div
              key={index}
              onClick={
                item.link
                  ? () => navigate(item.link)
                  : item.function
                  ? () => {
                      onClose();
                      item.function();
                    }
                  : undefined
              }
              className="flex items-center text-black p-1 hover:bg-gray-200 cursor-pointer rounded-md "
            >
              <button
                type="button"
                className="text-lg flex items-center gap-x-3 justify-center rounded-lg p-3 hover:bg-light-gray "
              >
                {item.icon}
                {t(item.label)}
                {item.label === "user.wishlist" && wishlist.length > 0 && (
                  <span className="rounded-full h-6 w-6 bg-red-600 text-white font-semibold text-base self-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          ))}
        </Drawer>
      )}
    </div>
  );
}

export default HomeDrawer;
