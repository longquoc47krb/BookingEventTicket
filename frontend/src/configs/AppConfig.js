import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlineSportsSoccer, MdOutlineTheaterComedy } from "react-icons/md";
import { GiWineBottle } from "react-icons/gi";
import { TbPlaneDeparture } from "react-icons/tb";
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
};
const MENU = [
  {
    label: "Trang chủ",
    key: "home",
    link: "/",
    icon: <AiOutlineHome />,
  },
  {
    label: "Âm nhạc",
    key: "music",
    link: "/events",
    icon: <IoMusicalNotesOutline />,
  },
  {
    label: "Sân khấu",
    key: "theater",
    link: "/events",
    icon: <MdOutlineTheaterComedy />,
  },
  {
    label: "Nightlife",
    key: "nightlife",
    link: "/events",
    icon: <GiWineBottle />,
  },
  {
    label: "Khoá học",
    key: "courses",
    link: "/events",
    icon: <AiOutlineBook />,
  },
  {
    label: "Thể thao",
    key: "sports",
    link: "/events",
    icon: <MdOutlineSportsSoccer />,
  },
  {
    label: "Du lịch",
    key: "travel",
    link: "/events",
    icon: <TbPlaneDeparture />,
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

const AppConfig = {
  USER_CONFIG,
  DEFAULT_PROPS,
  GOOGLE_SEARCH_BY_IMAGE,
  ROUTES,
  REACT_SLICK,
  LOGIN_BACKGROUND,
  MENU,
  CAROUSEL_SETTINGS,
};
export { AppConfig };
