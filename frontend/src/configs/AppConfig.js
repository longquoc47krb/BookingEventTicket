import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaTheaterMasks } from "react-icons/fa";
import { IoWineOutline } from "react-icons/io5";
import { BiBookBookmark, BiPhoneCall } from "react-icons/bi";
import { HiOutlineMusicNote } from "react-icons/hi";
import {
  MdSportsSoccer,
  MdOutlineAccountCircle,
  MdAttachMoney,
  MdExitToApp,
} from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";
import { TbPlaneInflight } from "react-icons/tb";
import { GrContactInfo } from "react-icons/gr";
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
    label: "Trang chủ",
    key: "home",
    link: "/",
    icon: <AiOutlineHome fontSize={16} />,
  },
  {
    label: "Âm nhạc",
    key: "music",
    link: "/events",
    icon: <HiOutlineMusicNote fontSize={16} />,
  },
  {
    label: "Sân khấu",
    key: "theater",
    link: "/events",
    icon: <FaTheaterMasks fontSize={16} />,
  },
  {
    label: "Nightlife",
    key: "nightlife",
    link: "/events",
    icon: <IoWineOutline fontSize={16} />,
  },
  {
    label: "Khoá học",
    key: "courses",
    link: "/events",
    icon: <BiBookBookmark fontSize={16} />,
  },
  {
    label: "Thể thao",
    key: "sports",
    link: "/events",
    icon: <MdSportsSoccer fontSize={16} />,
  },
  {
    label: "Du lịch",
    key: "travel",
    link: "/events",
    icon: <TbPlaneInflight fontSize={16} />,
  },
];
const USER_PROFILE_MENU = [
  {
    label: "Thông tin cá nhân",
    key: "profile",
    link: "/profile",
    // link: "/:username/profile",
    icon: <MdOutlineAccountCircle fontSize={16} />,
  },
  {
    label: "Đơn hàng đã mua",
    key: "order",
    link: "/purchase-order",
    icon: <MdAttachMoney fontSize={16} />,
  },
  {
    label: "Sự kiện yêu thích",
    key: "wishlist",
    link: "/wishlist",
    icon: <BsBookmarkHeart fontSize={16} />,
  },
  {
    label: "Đăng xuất",
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
    label: "Liên hệ",
    key: "contact",
    link: "/contact",
    icon: <BiPhoneCall fontSize={16} />,
  },
  {
    label: "Câu hỏi thường gặp",
    key: "faq",
    link: "/faq",
    icon: <AiOutlineQuestionCircle fontSize={16} />,
  },
  {
    label: "Về chúng tôi",
    key: "about",
    link: "/about",
    icon: <GrContactInfo fontSize={16} />,
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
};
export { AppConfig };
