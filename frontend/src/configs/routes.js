import Loadable from "react-loadable";
import UnauthenticatedRoute from "../components/layouts/UnauthenticatedLayout";
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

const Components = {
  LoginPage,
  AdminLoginPage,
  EventDashBoardPage,
};
export { Components };
