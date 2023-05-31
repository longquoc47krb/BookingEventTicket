import Loadable from "react-loadable";
import Loading from "../components/loading";
import ForgotPassword from "../views/auth/ForgotPassword";
import UserRegister from "../views/auth/UserRegister";
import FavoritePage from "../views/favorite-list";
import Payment from "../views/ticket-booking/paymentPage";

// Create a function to delay showing the loading component for a better user experience
const delayShowLoading = () => {
  const delay = 500; // Adjust the delay duration as needed
  let timeoutId = null;

  return {
    onLoad: () => {
      timeoutId = setTimeout(() => {
        Loading.preload(); // Preload the loading component to ensure smooth animation
        Loading.preloadReady(); // Mark the loading component as ready to show
      }, delay);
    },
    onCancel: () => clearTimeout(timeoutId),
  };
};
const ComingSoon = Loadable({
  loader: () => import("../views/comming-soon"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const LoginPage = Loadable({
  loader: () => import("../views/auth/UserLogin"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const MyTicket = Loadable({
  loader: () => import("../views/purchased-ticket"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const OAuthLoginPage = Loadable({
  loader: () => import("../views/auth/OAuthLogin"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const EventDashBoardPage = Loadable({
  loader: () => import("../views/event-dashboard"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const EventDetailPage = Loadable({
  loader: () => import("../views/event-detail"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const HomePage = Loadable({
  loader: () => import("../views/home"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const HelpCenterPage = Loadable({
  loader: () => import("../views/help-center"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const NewPasswordPage = Loadable({
  loader: () => import("../views/auth/NewPassword"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const ChangePasswordPage = Loadable({
  loader: () => import("../views/change-password"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const TicketBookingPage = Loadable({
  loader: () => import("../views/ticket-booking"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const BeAnOrganizerPage = Loadable({
  loader: () => import("../views/organizer-registration"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const UserProfilePage = Loadable({
  loader: () => import("../views/user-profile"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const NotFoundPage = Loadable({
  loader: () => import("../views/not-found"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
const OrganizerProfile = Loadable({
  loader: () => import("../views/organizer-profile"),
  loading: Loading,
  delay: 200, // Adjust the delay duration as needed
  timeout: 10000, // Adjust the timeout duration as needed
  ...delayShowLoading(), // Spread the result of delayShowLoading
});
export const unauthorizedRoute = [
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <UserRegister />,
    path: "/register",
  },

  {
    element: <ForgotPassword />,
    path: "/forgot-password",
  },
];
export const authorizedRoutes = [
  {
    element: <ChangePasswordPage />,
    path: "/update-password",
  },
  {
    element: <MyTicket />,
    path: "/my-orders",
  },
  {
    element: <FavoritePage />,
    path: "/wishlist",
  },
  {
    element: <TicketBookingPage />,
    path: "/ticket-booking/:eventId",
  },
  {
    element: <UserProfilePage />,
    path: "/profile",
    protected: true,
  },
  {
    element: <ComingSoon />,
    path: "/contact",
  },
  {
    element: <ComingSoon />,
    path: "/help-center",
  },
  {
    element: <ComingSoon />,
    path: "/about",
  },
];
const routes = [
  {
    element: <BeAnOrganizerPage />,
    path: "/organizer-registration",
  },
  {
    element: <Loading />,
    path: "/loading",
  },
  {
    element: <EventDashBoardPage />,
    path: "/events",
  },
  {
    element: <EventDetailPage />,
    path: "/event/:eventId",
  },
  {
    element: <NewPasswordPage />,
    path: "/new-password",
  },
  {
    element: <HomePage />,
    path: "/",
    exact: true,
  },

  {
    element: <NotFoundPage />,
    path: "*",
  },
  {
    element: <NotFoundPage />,
    path: "/page-not-found",
  },
  {
    element: <OAuthLoginPage />,
    path: "/oauth2/redirect",
  },

  {
    element: <Payment />,
    path: "/payment/redirect",
  },
  {
    element: <OrganizerProfile />,
    path: "/organizer-profile/:organizerId",
  },
];
export {
  BeAnOrganizerPage,
  EventDashBoardPage,
  EventDetailPage,
  HomePage,
  HelpCenterPage,
  LoginPage,
  NotFoundPage,
  UserProfilePage,
};
export default routes;
