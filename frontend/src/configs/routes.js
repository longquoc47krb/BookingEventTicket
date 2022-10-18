import Loadable from "react-loadable";
import Loading from "../components/loading";
import EventDetail from "../views/event-detail";
const LoginPage = Loadable({
  loader: () => import("../views/auth/UserLogin"),
  loading: Loading,
});
const RegisterPage = Loadable({
  loader: () => import("../views/auth/UserRegister"),
  loading: Loading,
});
const AdminLoginPage = Loadable({
  loader: () => import("../views/auth/AdminLogin"),
  loading: Loading,
});
const EventDashBoardPage = Loadable({
  loader: () => import("../views/event-dashboard"),
  loading: Loading,
});
const HomePage = Loadable({
  loader: () => import("../views/home"),
  loading: Loading,
});
const EventDetailPage = Loadable({
  loader: () => import("../views/event-detail"),
  loading: Loading,
});
const HelpCenterPage = Loadable({
  loader: () => import("../views/help-center"),
  loading: Loading,
});
const BeAnOrganizerPage = Loadable({
  loader: () => import("../views/be-an-organization"),
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
const routes = [
  {
    element: <BeAnOrganizerPage />,
    path: "/be-an-organization",
  },
  {
    element: <EventDashBoardPage />,
    path: "/events",
  },
  {
    element: <EventDetail />,
    path: "/event/:eventId",
  },
  {
    element: <HomePage />,
    path: "/",
    exact: true,
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <RegisterPage />,
    path: "/register",
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
    element: <UserProfilePage />,
    path: "/profile",
    protected: true,
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
