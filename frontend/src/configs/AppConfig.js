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
  MdScreenSearchDesktop,
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
    label: "category.online",
    key: "online",
    link: "/events?category=category.online",
    icon: <MdScreenSearchDesktop fontSize={16} />,
  },
  {
    label: "category.nightlife",
    key: "nightlife",
    link: "/events?category=category.nightlife",
    icon: <IoWineOutline fontSize={16} />,
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
    label: "user.my-ticket",
    key: "order",
    link: "/purchase-order",
    icon: <BsCashCoin fontSize={16} />,
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

const AppConfig = {
  USER_CONFIG,
  DEFAULT_PROPS,
  ROUTES,
  MENU,
  MENU_ORG,
  CAROUSEL_SETTINGS,
  USER_PROFILE_MENU,
  LANGUAGE_OPTIONS,
};
export { AppConfig };
