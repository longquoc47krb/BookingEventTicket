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
const GOOGLE_SEARCH_BY_IMAGE = (value) => {
  return `https://www.google.com/search?q=${value}&sxsrf=ALiCzsbDrT6RiypviNB3ibQ3Iiqx_EOO3A:1659965603904&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjzwqPhrbf5AhV4qVYBHZRXDGcQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1`;
};
const ROUTES = {
  LOGIN: "/login",
  ADMIN_LOGIN: "/admin-login",
};
const AppConfig = {
  USER_CONFIG,
  DEFAULT_PROPS,
  GOOGLE_SEARCH_BY_IMAGE,
  ROUTES,
};
export { AppConfig };
