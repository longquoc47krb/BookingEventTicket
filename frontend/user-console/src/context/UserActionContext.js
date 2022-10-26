import { createContext, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import eventServices from "../api/services/eventServices";
import { AlertPopup } from "../components/common/alert";
const UserActionContext = createContext();
const { getEventById } = eventServices;
export const UserActionContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistEvent, setWishlistEvent] = useState();
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const getWishlist = () => {
    setWishlistEvent([]);

    // const list = reactLocalStorage.getObject("userWishlist");
    const list = JSON.parse(localStorage.getItem("userWishlist"));
    console.log({ list });
    const userWishlist = list ? list.wishlist : [];
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
  const addToWishlist = (eventId) => {
    setWishlist((prev) => {
      return [...prev, eventId];
    });

    const values = [...wishlist];
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
  useMemo(() => {
    getWishlist();
  }, []);

  const removeFromWishlist = (eventId) => {
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
    // reactLocalStorage.setObject("userWishlist", list);
    localStorage.setItem("userWishlist", JSON.stringify(list));
    getWishlist();
  };
  const clearWishlist = () => {
    setWishlist([]);
    const list = {
      wishlist: [],
    };
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
        showDrawer,
        setShowDrawer,
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
