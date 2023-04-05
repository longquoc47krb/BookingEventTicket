/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useFetchUserInfo } from "../api/services/accountServices";
import customerServices, {
  useFetchFollowingOrganizer,
} from "../api/services/customerServices";
import eventServices, {
  useCheckEventsStatus,
} from "../api/services/eventServices";
import { AlertPopup } from "../components/common/alert";
import {
  updateFollowingOrganizers,
  userInfoSelector,
} from "../redux/slices/accountSlice";
const UserActionContext = createContext();
const { addWishlistItem, clearAllWishlist, removeWishlistItem, fetchWishlist } =
  customerServices;

const { getEventById, fetchOrganizerByEventId } = eventServices;
export const UserActionContextProvider = ({ children }) => {
  const [eventId, setEventId] = useState("");
  console.log({ eventId });
  const [wishlist, setWishlist] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followingOrganizerList, setFollowingOrganizerList] = useState([]);
  const [wishlistEvent, setWishlistEvent] = useState();
  const [activeDrawer, toggleDrawer] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const cityName = localStorage.getItem("city");
  const { data: checkedEvents } = useCheckEventsStatus();
  const { data: followingOrganizer, iisLoading } = useFetchFollowingOrganizer(
    userInfo.id
  );
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
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const getCityName = async () => {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        localStorage.setItem(
          "city",
          response.data.results[0].address_components[3].short_name
        );
        return response.data;
      };
      getCityName();
    });
  };
  useEffect(() => {
    getWishlist();
  }, [userInfo]);
  useEffect(() => {
    dispatch(updateFollowingOrganizers(followingOrganizer));
  }, [followingOrganizer]);
  useEffect(() => {
    getLocation();
  }, [cityName, userInfo]);
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
        followingList,
        followingOrganizerList,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        clearWishlist,
        activeDrawer,
        toggleDrawer,
        checkedEvents,
        user,
        eventId,
        setEventId,
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
