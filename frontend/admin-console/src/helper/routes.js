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
const OrderPage = Loadable({
  loader: () => import("../pages/Orders"),
  loading: Loading,
});
const CalendarPage = Loadable({
  loader: () => import("../pages/Calendar"),
  loading: Loading,
});
const TicketPage = Loadable({
  loader: () => import("../pages/Tickets"),
  loading: Loading,
});
const routes = [
  {
    element: <AddEditEventPage />,
    path: "/event/create",
  },
  {
    element: <AddEditEventPage />,
    path: "/event/update/:eventId",
  },
  {
    element: <CalendarPage />,
    path: "/calendar",
  },
  {
    element: <EventsPage />,
    path: "/events",
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
    element: <TicketPage />,
    path: "/tickets",
  },
];
export {
  EventsPage,
  OverviewPage,
  OrderPage,
  AddEditEventPage,
  TicketPage,
  CalendarPage,
};
export default routes;
