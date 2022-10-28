import loadable from "@loadable/component";
import Loading from "../components/loading";
import ForgotPassword from "../views/auth/ForgotPassword";
import UserRegister from "../views/auth/UserRegister";
const LoginPage = loadable(() => import("../views/auth/UserLogin"), {
  fallback: Loading,
});
const AdminLoginPage = loadable(() => import("../views/auth/AdminLogin"), {
  fallback: Loading,
});
const OAuthLoginPage = loadable(() => import("../views/auth/OAuthLogin"), {
  fallback: Loading,
});
const EventDashBoardPage = loadable(() => import("../views/event-dashboard"), {
  fallback: Loading,
});
const EventDetailPage = loadable(() => import("../views/event-detail"), {
  fallback: Loading,
});
const HomePage = loadable(() => import("../views/home"), { fallback: Loading });
const HelpCenterPage = loadable(() => import("../views/help-center"), {
  fallback: Loading,
});
const NewPasswordPage = loadable(() => import("../views/auth/NewPassword"), {
  fallback: Loading,
});
const TicketBookingPage = loadable(() => import("../views/ticket-booking"), {
  fallback: Loading,
});
const BeAnOrganizerPage = loadable(
  () => import("../views/organizer-registration"),
  { fallback: Loading }
);
const UserProfilePage = loadable(() => import("../views/user-profile"), {
  fallback: Loading,
});
const NotFoundPage = loadable(() => import("../views/not-found"), {
  fallback: Loading,
});
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
    element: <ForgotPassword />,
    path: "/forgot-password",
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
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <UserRegister />,
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
    element: <OAuthLoginPage />,
    path: "/oauth2/redirect",
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
