/* eslint-disable no-undef */
import i18next, { t } from "i18next";
import { useTranslation } from "react-i18next";
import {
  AiFillCheckCircle,
  AiOutlineAreaChart,
  AiOutlineGlobal,
  AiOutlineHome,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsBriefcase, BsCashCoin, BsInstagram } from "react-icons/bs";
import { FaInfo, FaSearchLocation, FaTheaterMasks } from "react-icons/fa";
import { HiOutlineMusicNote } from "react-icons/hi";
import { IoIosApps } from "react-icons/io";
import { IoLogoFacebook, IoWineOutline } from "react-icons/io5";
import {
  MdExitToApp,
  MdOutlineAccountCircle,
  MdSportsSoccer,
} from "react-icons/md";
import {
  RiBookmark3Fill,
  RiCustomerServiceFill,
  RiLockPasswordLine,
} from "react-icons/ri";
import { TbPlaneInflight } from "react-icons/tb";
import BigHit from "../assets/BIGHIT.webp";
import Metub from "../assets/Metub.png";
import MTP from "../assets/MTP.png";
import MTV from "../assets/MTV.png";
import SM from "../assets/SM.png";
import UnitedKingdomFlag from "../assets/united-kingdom-flag.png";
import VietnamFlag from "../assets/vietnam-flag.png";
import YG from "../assets/YG.png";
import { AlertPopup } from "../components/common/alert";
import { logOutAccount } from "../redux/slices/accountSlice";
import { store } from "../redux/store";
import theme from "../shared/theme";
const USER_CONFIG = {
  SYSTEM_ADMIN: {
    roleLevel: 1,
    landingPage: "/admin",
  },
  ORGANIZATION_ADMIN: {
    roleLevel: 2,
    landingPage: "/organization/events",
  },
  USER: {
    roleLevel: 3,
    landingPage: "/",
  },
};
const DEFAULT_PROPS = {
  EVENT: {
    image:
      "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg",
    title: "Untitled",
    price: "FREE",
    categories: [],
  },
};
const ROUTES = {
  LOGIN: "/login",
  ADMIN_LOGIN: "/admin-login",
  EVENT: {
    Detail: "/event/:id",
    All: "/events",
  },
};
const MENU = [
  {
    label: "home",
    key: "home",
    link: "/",
    icon: <AiOutlineHome fontSize={16} />,
  },
  {
    label: "category.music",
    key: "music",
    link: "/events?category=category.music",
    icon: <HiOutlineMusicNote fontSize={16} />,
  },
  {
    label: "category.theater",
    key: "theater",
    link: "/events?category=category.theater",
    icon: <FaTheaterMasks fontSize={16} />,
  },
  {
    label: "category.nightlife",
    key: "nightlife",
    link: "/events?category=category.nightlife",
    icon: <IoWineOutline fontSize={16} />,
  },
  {
    label: "category.community",
    key: "community",
    link: "/events?category=category.community",
    icon: <AiOutlineGlobal fontSize={16} />,
  },
  {
    label: "category.seminar",
    key: "seminar",
    link: "/events?category=category.seminar",
    icon: <BsBriefcase fontSize={16} />,
  },
  {
    label: "category.sport",
    key: "sport",
    link: "/events?category=category.sport",
    icon: <MdSportsSoccer fontSize={16} />,
  },
  {
    label: "category.travel",
    key: "travel",
    link: "/events?category=category.travel",
    icon: <TbPlaneInflight fontSize={16} />,
  },
];
const USER_PROFILE_MENU = [
  {
    label: "user.profile",
    key: "profile",
    link: "/profile",
    icon: <MdOutlineAccountCircle fontSize={16} />,
  },
  {
    label: "user.changePassword",
    key: "changePassword",
    link: "/update-password",
    icon: <RiLockPasswordLine fontSize={16} />,
  },
  {
    label: "user.my-ticket",
    key: "order",
    link: "/purchase-order",
    icon: <BsCashCoin fontSize={16} />,
  },
];
const CAROUSEL_SETTINGS = [
  {
    breakpoint: 1300,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];
const MENU_ORG = [
  {
    label: "org.contact",
    key: "contact",
    link: "/contact",
    icon: <BiPhoneCall fontSize={16} />,
  },
  {
    label: "org.faq",
    key: "faq",
    link: "/help-center",
    icon: <AiOutlineQuestionCircle fontSize={16} />,
  },
  {
    label: "org.about",
    key: "about",
    link: "/about",
    icon: <FaInfo fontSize={16} />,
  },
];
const SOCIAL_MENU = [
  {
    icon: <IoLogoFacebook className="facebook" />,
    link: "https://www.facebook.com/long.quoc.0702/",
  },
  {
    icon: <BsInstagram className="instagram" />,
    link: "https://www.instagram.com/longquoc_47/",
  },
];
const ORGANIZER_CAROUSEL = [
  {
    id: "1",
    background:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: "2",
    background:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "3",
    background:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];
const LANGUAGE_OPTIONS = [
  {
    key: "en",
    value: "en",
    label: "language.english",
    image: UnitedKingdomFlag,
  },
  {
    key: "vn",
    value: "vn",
    label: "language.vietnamese",
    image: VietnamFlag,
  },
];
const ORGANIZER_LANDINGPAGE_PICTURE = [
  "https://images.unsplash.com/photo-1523521803700-b3bcaeab0150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];
const ORGANIZATION_INTRODUCE_ITEM = [
  {
    icon: <AiFillCheckCircle color={theme.main} fontSize={25} />,
    title: "lotus.intro.1.title",
    content: "lotus.intro.1.content",
    delay: "0s",
  },
  {
    icon: <AiOutlineAreaChart color={theme.main} fontSize={45} />,
    title: "lotus.intro.2.title",
    content: "lotus.intro.2.content",
    delay: "0.5s",
  },
  {
    icon: <RiCustomerServiceFill color={theme.main} fontSize={35} />,
    title: "lotus.intro.3.title",
    content: "lotus.intro.3.content",
    delay: "1s",
  },
  {
    icon: <BsCashCoin color={theme.main} fontSize={25} />,
    title: "lotus.intro.4.title",
    content: "lotus.intro.4.content",
    delay: "1.5s",
  },
  {
    icon: <IoIosApps color={theme.main} fontSize={25} />,
    title: "lotus.intro.5.title",
    content: "lotus.intro.5.content",
    delay: "2s",
  },
  {
    icon: <FaSearchLocation color={theme.main} fontSize={25} />,
    title: "lotus.intro.6.title",
    content: "lotus.intro.6.content",
    delay: "2.5s",
  },
];
const ORGANIZATION_PARTNERS = [
  {
    title: "YG",
    image: YG,
  },
  {
    title: "SM",
    image: SM,
  },
  {
    title: "MTV",
    image: MTV,
  },
  {
    title: "MTP",
    image: MTP,
  },
  {
    title: "Metub",
    image: Metub,
  },
  {
    title: "BigHit",
    image: BigHit,
  },
];
const MOBILE_DRAWER_UNAUTHEN = [
  {
    icon: <AiOutlineGlobal className="text-2xl cursor-pointer" />,
    label: "user.language",
    function: () => {
      var language = localStorage.getItem("i18nextLng");
      const switchLanguague = async () => {
        if (language === "en") {
          await i18next.changeLanguage("vn");
        } else {
          await i18next.changeLanguage("en");
        }
      };
      switchLanguague();
      AlertPopup({
        title: t("popup.language.success", {
          lang:
            language === "en"
              ? t("language.vietnamese")
              : t("language.english"),
        }),
      });
    },
  },
];
const MOBILE_DRAWER = [
  {
    icon: <RiBookmark3Fill className="text-2xl cursor-pointer" />,
    label: "user.wishlist",
    link: "/wishlist",
  },
  {
    icon: <BsCashCoin className="text-2xl cursor-pointer" />,
    label: "user.my-ticket",
    link: "/purchase-order",
  },
  {
    icon: <RiLockPasswordLine className="text-2xl cursor-pointer" />,
    label: "user.changePassword",
    link: "/update-password",
  },
  {
    icon: <AiOutlineGlobal className="text-2xl cursor-pointer" />,
    label: "user.language",
    function: () => {
      var language = localStorage.getItem("i18nextLng");
      const switchLanguague = async () => {
        if (language === "en") {
          await i18next.changeLanguage("vn");
        } else {
          await i18next.changeLanguage("en");
        }
      };
      switchLanguague();
      AlertPopup({
        title: t("popup.language.success", {
          lang:
            language === "en"
              ? t("language.vietnamese")
              : t("language.english"),
        }),
      });
    },
  },
  {
    icon: <MdExitToApp className="text-2xl cursor-pointer" />,
    label: "user.logout",
    function: () => {
      store.dispatch(logOutAccount());
      AlertPopup({
        title: t("popup.logout.success"),
      });
    },
  },
];
const AppConfig = {
  USER_CONFIG,
  DEFAULT_PROPS,
  ROUTES,
  MENU,
  MENU_ORG,
  SOCIAL_MENU,
  CAROUSEL_SETTINGS,
  USER_PROFILE_MENU,
  LANGUAGE_OPTIONS,
  ORGANIZER_CAROUSEL,
  ORGANIZER_LANDINGPAGE_PICTURE,
  ORGANIZATION_INTRODUCE_ITEM,
  ORGANIZATION_PARTNERS,
  MOBILE_DRAWER_UNAUTHEN,
  MOBILE_DRAWER,
};
export default AppConfig;
