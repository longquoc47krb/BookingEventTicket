import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiOutlinePicture,
} from "react-icons/ai";
import { FaTheaterMasks, FaInfo } from "react-icons/fa";
import { IoWineOutline } from "react-icons/io5";
import { BiBookBookmark, BiPhoneCall } from "react-icons/bi";
import { HiOutlineMusicNote } from "react-icons/hi";
import {
  MdSportsSoccer,
  MdOutlineAccountCircle,
  MdExitToApp,
} from "react-icons/md";
import { BsBookmarkHeart, BsCashCoin, BsBriefcase } from "react-icons/bs";
import { TbPlaneInflight } from "react-icons/tb";
import VietnamFlag from "../assets/vietnam-flag.png";
import UnitedKingdomFlag from "../assets/united-kingdom-flag.png";
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
const REACT_SLICK = {
  dots: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const GOOGLE_SEARCH_BY_IMAGE = (value) => {
  return `https://www.google.com/search?q=${value}&sxsrf=ALiCzsbDrT6RiypviNB3ibQ3Iiqx_EOO3A:1659965603904&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjzwqPhrbf5AhV4qVYBHZRXDGcQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1`;
};
const LOGIN_BACKGROUND = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1520242739010-44e95bde329e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];
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
    link: "/events",
    icon: <HiOutlineMusicNote fontSize={16} />,
  },
  {
    label: "category.theater",
    key: "theater",
    link: "/events",
    icon: <FaTheaterMasks fontSize={16} />,
  },
  {
    label: "category.exhibition",
    key: "exhibition",
    link: "/events",
    icon: <AiOutlinePicture fontSize={16} />,
  },
  {
    label: "category.nightlife",
    key: "nightlife",
    link: "/events",
    icon: <IoWineOutline fontSize={16} />,
  },
  {
    label: "category.courses",
    key: "courses",
    link: "/events",
    icon: <BiBookBookmark fontSize={16} />,
  },
  {
    label: "category.seminar",
    key: "seminar",
    link: "/events",
    icon: <BsBriefcase fontSize={16} />,
  },
  {
    label: "category.sports",
    key: "sports",
    link: "/events",
    icon: <MdSportsSoccer fontSize={16} />,
  },
  {
    label: "category.travel",
    key: "travel",
    link: "/events",
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
    label: "user.purchased",
    key: "order",
    link: "/purchase-order",
    icon: <BsCashCoin fontSize={16} />,
  },
  {
    label: "user.wishlist",
    key: "wishlist",
    link: "/wishlist",
    icon: <BsBookmarkHeart fontSize={16} />,
  },
  {
    label: "user.logout",
    key: "logout",
    link: null,
    icon: <MdExitToApp fontSize={16} />,
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
const LANGUAGE_OPTIONS = [
  {
    key: "en",
    value: "en",
    label: "English",
    image: UnitedKingdomFlag,
  },
  {
    key: "vn",
    value: "vn",
    label: "Tiếng Việt",
    image: VietnamFlag,
  },
];
const SWAL_OPTIONS = [
  {
    title: "Thất bại!",
    text: "Bạn chưa đăng nhập.",
    icon: "error",
    buttons: {
      cancel: {
        text: "No, cancel plx!",
        value: null,
        visible: true,
        className: "",
        closeModal: false,
      },
      confirm: {
        text: "Yes, delete it!",
        value: true,
        visible: true,
        className: "bg-danger",
        closeModal: false,
      },
    },
  },
];
const AppConfig = {
  USER_CONFIG,
  DEFAULT_PROPS,
  GOOGLE_SEARCH_BY_IMAGE,
  ROUTES,
  REACT_SLICK,
  LOGIN_BACKGROUND,
  MENU,
  MENU_ORG,
  CAROUSEL_SETTINGS,
  USER_PROFILE_MENU,
  SWAL_OPTIONS,
  LANGUAGE_OPTIONS,
};
export { AppConfig };
