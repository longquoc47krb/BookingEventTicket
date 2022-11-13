import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTopPage from "./components/scroll-to-top";
import TicketTable from "./components/ticket-table";
import routes from "./configs/routes";
import { UserActionContextProvider } from "./context/UserActionContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";
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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserAuthContextProvider>
          <UserActionContextProvider>
            <Routes>
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
