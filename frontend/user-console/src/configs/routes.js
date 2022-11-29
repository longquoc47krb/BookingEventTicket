import Loadable from "react-loadable";
import Loading from "../components/loading";
import ForgotPassword from "../views/auth/ForgotPassword";
import UserRegister from "../views/auth/UserRegister";
import FavoritePage from "../views/favorite-list";
import Payment from "../views/ticket-booking/paymentPage";
const LoginPage = Loadable({
  loader: () => import("../views/auth/UserLogin"),
  loading: Loading,
});
const MyTicket = Loadable({
  loader: () => import("../views/purchased-ticket"),
  loading: Loading,
});
const AdminLoginPage = Loadable({
  loader: () => import("../views/auth/AdminLogin"),
  loading: Loading,
});
const OAuthLoginPage = Loadable({
  loader: () => import("../views/auth/OAuthLogin"),
  loading: Loading,
});
const EventDashBoardPage = Loadable({
  loader: () => import("../views/event-dashboard"),
  loading: Loading,
});
const EventDetailPage = Loadable({
  loader: () => import("../views/event-detail"),
  loading: Loading,
});
const HomePage = Loadable({
  loader: () => import("../views/home"),
  loading: Loading,
});
const HelpCenterPage = Loadable({
  loader: () => import("../views/help-center"),
  loading: Loading,
});
const NewPasswordPage = Loadable({
  loader: () => import("../views/auth/NewPassword"),
  loading: Loading,
});
const ChangePasswordPage = Loadable({
  loader: () => import("../views/change-password"),
  loading: Loading,
});
const TicketBookingPage = Loadable({
  loader: () => import("../views/ticket-booking"),
  loading: Loading,
});
const BeAnOrganizerPage = Loadable({
  loader: () => import("../views/organizer-registration"),
  loading: Loading,
});
const UserProfilePage = Loadable({
  loader: () => import("../views/user-profile"),
  loading: Loading,
});
const NotFoundPage = Loadable({
  loader: () => import("../views/not-found"),
  loading: Loading,
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
];
const routes = [
  {
    element: <BeAnOrganizerPage />,
    path: "/organizer-registration",
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
];
export {
  AdminLoginPage,
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
