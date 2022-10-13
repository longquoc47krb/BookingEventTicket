import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTopPage from "./components/scroll-to-top";
import routes from "./configs/routes";
import { UserActionContextProvider } from "./context/UserActionContext";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { UserFetchDataContextProvider } from "./context/UserFetchDateContext";
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 1000,
    cacheTime: 1000 * 60 * 60 * 24,
    queries: {
      refetchOnWindowFocus: true,
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
        <UserFetchDataContextProvider>
          <UserAuthContextProvider>
            <UserActionContextProvider>
              <Routes>
                {routes.map((route) => (
                  <Route path={route.path} element={route.element} />
                ))}
                {/* // <Route
              //   path="/profile"
              //   roles={[Role.User]}
              //   element={
              //     <UserRoute
              //       roles={[Role.User]}
              //       component={UserProfile}
              //     ></UserRoute>
              //   } */}
              </Routes>
            </UserActionContextProvider>
          </UserAuthContextProvider>
        </UserFetchDataContextProvider>
      </BrowserRouter>
      <ScrollToTopPage top={800} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
