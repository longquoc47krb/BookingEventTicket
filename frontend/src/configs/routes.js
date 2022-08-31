import Loadable from "react-loadable";
import { Spin } from "antd";
import UnauthenticatedRoute from "../components/layouts/UnauthenticatedLayout";
const LoginPage = Loadable({
  loader: () => import("../views/auth/UserLogin"),
  loading: () => <Spin />,
});
const AdminLoginPage = Loadable({
  loader: () => import("../views/auth/AdminLogin"),
  loading: () => <Spin />,
});

const routes = {
  authorizedRoutes: {},
  unauthorizedRoutes: {
    name: "unauthenticated",
    layout: UnauthenticatedRoute,
    routes: [],
  },
  publicRoutes: {},
};
