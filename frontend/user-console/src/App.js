import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./components/routes/PublicRoute";
import ScrollToTopPage from "./components/scroll-to-top";
import TicketTable from "./components/ticket-table";
import routes, { unauthorizedRoute } from "./configs/routes";
import { UserActionContextProvider } from "./context/UserActionContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { tokenSelector } from "./redux/slices/accountSlice";
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 30000,
    cacheTime: 1000 * 60 * 30,
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Create a client
  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }, []);
  const token = useSelector(tokenSelector);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserAuthContextProvider>
          <UserActionContextProvider>
            <Routes>
              <Route element={<PublicRoute isAuth={token} />}>
                {unauthorizedRoute.map((route) => (
                  <Route path={route.path} element={route.element} />
                ))}
              </Route>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
              <Route path="/test" element={<TicketTable />} />
              {/* // <Route
              //   path="/profile"
              //   roles={[Role.User]}
              //   element={
              //     <UserRoute
              //       roles={[Role.User]}
              //       component={UserProfile}
              //     ></UserRoute>
              //   } */}
              <Route path="/test" element={<TicketTable />} />
            </Routes>
          </UserActionContextProvider>
        </UserAuthContextProvider>
      </BrowserRouter>
      <ScrollToTopPage top={800} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
