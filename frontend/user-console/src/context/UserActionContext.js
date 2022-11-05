import { createContext, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserInfo } from "../api/services/accountServices";
import customerServices from "../api/services/customerServices";
import eventServices, {
  useCheckEventsStatus,
} from "../api/services/eventServices";
import { AlertPopup } from "../components/common/alert";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { wishlistSelector } from "../redux/slices/customerSlice";
const UserActionContext = createContext();
const { getEventById } = eventServices;
const { addWishlistItem, clearAllWishlist, removeWishlistItem, fetchWishlist } =
  customerServices;
export const UserActionContextProvider = ({ children }) => {
  const [wishlistEvent, setWishlistEvent] = useState();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelector);
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();
  const userInfo = useSelector(userInfoSelector);
  const { data: checkedEvents, status: eventstatusStatus } =
    useCheckEventsStatus();
  const { data: user, status: userStatus } = useFetchUserInfo(
    userInfo ? userInfo.email : ""
  );
  const getWishlist = async () => {
    await fetchWishlist(userInfo.id);
  };
  const addToWishlist = async (eventId) => {
    await addWishlistItem(eventId, userInfo.id);
    AlertPopup({
      title: t("wishlist.add.title"),
      text: t("wishlist.add.text"),
    });
    getWishlist();
  };
  useMemo(() => {
    getWishlist();
  }, []);

  const removeFromWishlist = async (eventId) => {
    await removeWishlistItem(eventId, userInfo.id);
    AlertPopup({
      title: t("wishlist.remove.title"),
      text: t("wishlist.remove.text"),
    });

    getWishlist();
  };
  const clearWishlist = async () => {
    await clearAllWishlist(userInfo.id);
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
