import Loadable from "react-loadable";
import Loading from "../components/Loading";

const EventsPage = Loadable({
  loader: () => import("../pages/Events"),
  loading: Loading,
});
const AddEditEventPage = Loadable({
  loader: () => import("../pages/AddEditEvent"),
  loading: Loading,
});
const OverviewPage = Loadable({
  loader: () => import("../pages/Overview"),
  loading: Loading,
});
const LoginPage = Loadable({
  loader: () => import("../pages/AdminLogin"),
  loading: Loading,
});
const OrderPage = Loadable({
  loader: () => import("../pages/Orders"),
  loading: Loading,
});
const PaymentPage = Loadable({
  loader: () => import("../pages/Payments"),
  loading: Loading,
});
const ProfilePage = Loadable({
  loader: () => import("../pages/Profile"),
  loading: Loading,
});
const ForgotPasswordPage = Loadable({
  loader: () => import("../pages/ForgotPassword"),
  loading: Loading,
});
const AccountPage = Loadable({
  loader: () => import("../pages/Accounts"),
  loading: Loading,
});
const ChangePasswordPage = Loadable({
  loader: () => import("../pages/ChangePassword"),
  loading: Loading,
});
const CategoriesPage = Loadable({
  loader: () => import("../pages/Categories"),
  loading: Loading,
});
const TicketPage = Loadable({
  loader: () => import("../pages/Tickets"),
  loading: Loading,
});
const NewPasswordPage = Loadable({
  loader: () => import("../pages/NewPassword"),
  loading: Loading,
});
const AdminDashboardPage = Loadable({
  loader: () => import("../pages/AdminDashboard"),
  loading: Loading,
});
export const routes = [
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <ForgotPasswordPage />,
    path: "/forgot-password",
  },
  {
    element: <NewPasswordPage />,
    path: "/new-password",
  },
];
export const adminRoutes = [
  {
    element: <AdminDashboardPage />,
    path: "/",
  },
  {
    element: <AdminDashboardPage />,
    path: "/overview",
  },
  {
    element: <AccountPage />,
    path: "/accounts",
  },
  {
    element: <ChangePasswordPage />,
    path: "/update-password",
  },
  {
    element: <CategoriesPage />,
    path: "/categories",
  },
  {
    element: <ProfilePage />,
    path: "/profile",
  },
];
export const organizerRoutes = [
  {
    element: <AddEditEventPage />,
    path: "/event/create",
  },
  {
    element: <AddEditEventPage />,
    path: "/event/update/:eventId",
  },
  {
    element: <ChangePasswordPage />,
    path: "/update-password",
  },
  {
    element: <EventsPage />,
    path: "/events",
  },
  {
    element: <PaymentPage />,
    path: "/payment-list",
  },
  {
    element: <OverviewPage />,
    path: "/",
  },
  {
    element: <OverviewPage />,
    path: "/overview",
  },
  {
    element: <OrderPage />,
    path: "/orders",
  },
  {
    element: <ProfilePage />,
    path: "/profile",
  },
  {
    element: <TicketPage />,
    path: "/tickets",
  },
];
export { EventsPage, OverviewPage, OrderPage, AddEditEventPage, TicketPage };
export default routes;
