import { MenuItem } from "@mui/material";
import { Divider, Empty } from "antd";
import { t } from "i18next";
import React from "react";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header";
import WishListItem from "../../components/common/wishlist-item";
import FooterComponent from "../../components/FooterComponent";
import HelmetHeader from "../../components/helmet";
import HomeDrawer from "../../components/home-drawer";
import { useUserActionContext } from "../../context/UserActionContext";
import { setPathName } from "../../redux/slices/routeSlice";
import { isNotEmpty } from "../../utils/utils";

function FavoritePage() {
  const { wishlist, clearWishlist } = useUserActionContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <>
      <HelmetHeader title={t("user.wishlist")} content="Favorite events" />
      <Header />
      <div className="min-h-[calc(100vh-128px)]">
        <h1 className="font-bold text-3xl px-3 flex justify-center text-[#1f3e82] capitalize">
          {t("user.wishlist")}
        </h1>
        <hr style={{ width: "100%" }} />
        <div className="wishlist-container">
          {isNotEmpty(wishlist) ? (
            wishlist.map((id, index) => (
              <div key={index}>
                <MenuItem
                  key={index}
                  className="mb-2"
                  onClick={() => {
                    dispatch(setPathName(window.location.pathname));
                    navigate(`/event/${id}`);
                  }}
                >
                  <WishListItem id={id} />
                </MenuItem>
                <Divider style={{ width: "100%" }} />
              </div>
            ))
          ) : (
            <MenuItem>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                  width: 480,
                  display: "flex",
                  justifyContent: "center",
                }}
                description={<span>{t("search.empty")}</span>}
              ></Empty>
            </MenuItem>
          )}
        </div>
        {isNotEmpty(wishlist) ? (
          <>
            <MenuItem>
              <div
                className="flex items-center gap-x-2 justify-center w-full"
                onClick={() => {
                  clearWishlist();
                }}
              >
                {t("remove-all")}
                <BiX fontSize={30} className="cursor-pointer" />
              </div>
            </MenuItem>
          </>
        ) : null}
      </div>
      <HomeDrawer
        toggleDrawer={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      />
      <FooterComponent
        toggleDrawer={toggleDrawer}
        setToggleDrawer={setToggleDrawer}
      />
    </>
  );
}

export default FavoritePage;
