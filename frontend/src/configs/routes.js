import Loadable from "react-loadable";
import Loading from "../components/loading";
const LoginPage = Loadable({
  loader: () => import("../views/auth/UserLogin"),
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

export {
  LoginPage,
  AdminLoginPage,
  EventDashBoardPage,
  HomePage,
  EventDetailPage,
};
