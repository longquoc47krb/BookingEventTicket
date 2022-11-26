/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFetchUserInfo } from "../api/services/accountServices";
import customerServices from "../api/services/customerServices";
import eventServices, {
  useCheckEventsStatus,
} from "../api/services/eventServices";
import { AlertPopup } from "../components/common/alert";
import { userInfoSelector } from "../redux/slices/accountSlice";
const UserActionContext = createContext();
const { addWishlistItem, clearAllWishlist, removeWishlistItem, fetchWishlist } =
  customerServices;
const { getEventById } = eventServices;
export const UserActionContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistEvent, setWishlistEvent] = useState();
  const [activeDrawer, toggleDrawer] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const { data: checkedEvents } = useCheckEventsStatus();
  const { data: user } = useFetchUserInfo(userInfo ? userInfo.email : "");
  const getWishlist = async () => {
    setWishlistEvent([]);

    const list = await fetchWishlist(userInfo.id);
    localStorage.setItem("userWishlist", JSON.stringify(list.data));
    // const list = JSON.parse(localStorage.getItem("userWishlist"));
    const userWishlist = JSON.parse(localStorage.getItem("userWishlist")) ?? [];
    setWishlist(userWishlist);
    userWishlist &&
      userWishlist.forEach((eventId) => {
        getEventById(eventId).then((response) => {
          setWishlistEvent((prev) => {
            return [...prev, response.data];
          });
        });
      });
  };
  const addToWishlist = async (eventId) => {
    setWishlist((prev) => {
      return [...prev, eventId];
    });

    const values = [...wishlist];
    await addWishlistItem(eventId, userInfo.id);
    values.push(eventId);
    const list = {
      wishlist: values,
    };

    // reactLocalStorage.setObject("userWishlist", list);
    localStorage.setItem("userWishlist", JSON.stringify(list));
    AlertPopup({
      title: t("wishlist.add.title"),
      text: t("wishlist.add.text"),
    });
    getWishlist();
  };
  useEffect(() => {
    getWishlist();
  }, [userInfo]);

  const removeFromWishlist = async (eventId) => {
    let values = [...wishlist];
    values = values.filter((prod) => prod !== eventId);
    setWishlist(values);
    const list = {
      wishlist: values,
    };
    AlertPopup({
      title: t("wishlist.remove.title"),
      text: t("wishlist.remove.text"),
    });
    await removeWishlistItem(eventId, userInfo.id);
    // reactLocalStorage.setObject("userWishlist", list);
    localStorage.setItem("userWishlist", JSON.stringify(list));
    getWishlist();
  };
  const clearWishlist = async () => {
    setWishlist([]);
    const list = {
      wishlist: [],
    };
    await clearAllWishlist(userInfo.id);
    localStorage.setItem("userWishlist", JSON.stringify(list));
    getWishlist();
  };
  return (
    <UserActionContext.Provider
      value={{
        wishlist,
        wishlistEvent,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        clearWishlist,
        activeDrawer,
        toggleDrawer,
        checkedEvents,
        user,
      }}
    >
      {children}
    </UserActionContext.Provider>
  );
};
export const useUserActionContext = () => {
  const context = useContext(UserActionContext);
  return context;
};
