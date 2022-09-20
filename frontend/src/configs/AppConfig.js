import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import LiquorRoundedIcon from "@mui/icons-material/LiquorRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";

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
    icon: <HomeRoundedIcon fontSize="medium" />,
  },
  {
    label: "Âm nhạc",
    key: "music",
    link: "/events",
    icon: <MusicNoteRoundedIcon fontSize="medium" />,
  },
  {
    label: "Sân khấu",
    key: "theater",
    link: "/events",
    icon: <TheaterComedyRoundedIcon fontSize="medium" />,
  },
  {
    label: "Nightlife",
    key: "nightlife",
    link: "/events",
    icon: <LiquorRoundedIcon fontSize="medium" />,
  },
  {
    label: "Khoá học",
    key: "courses",
    link: "/events",
    icon: <LibraryBooksRoundedIcon fontSize="medium" />,
  },
  {
    label: "Thể thao",
    key: "sports",
    link: "/events",
    icon: <SportsSoccerRoundedIcon fontSize="medium" />,
  },
  {
    label: "Du lịch",
    key: "travel",
    link: "/events",
    icon: <FlightTakeoffRoundedIcon fontSize="medium" />,
  },
];
const USER_PROFILE_MENU = [
  {
    label: "Thông tin cá nhân",
    key: "profile",
    link: "/profile",
    // link: "/:username/profile",
    icon: <AccountCircleRoundedIcon fontSize="medium" />,
  },
  {
    label: "Đơn hàng đã mua",
    key: "order",
    link: "/purchase-order",
    icon: <LocalActivityRoundedIcon fontSize="medium" />,
  },
  {
    label: "Sự kiện yêu thích",
    key: "wishlist",
    link: "/wishlist",
    icon: <BookmarkRoundedIcon fontSize="medium" />,
  },
  {
    label: "Đăng xuất",
    key: "logout",
    link: null,
    icon: <LoginRoundedIcon fontSize="medium" />,
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
  USER_PROFILE_MENU,
};
export { AppConfig };
