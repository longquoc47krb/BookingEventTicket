import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes, {
  AdminLoginPage,
  EventDashBoardPage,
  EventDetailPage,
  HomePage,
  LoginPage,
} from "./configs/routes";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import NotFoundPage from "./views/not-found";
import UserProfile from "./views/user-profile";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import ScrollToTopPage from "./components/scroll-to-top";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OrganizeRegistration from "./views/be-an-organization";
import { UserActionContextProvider } from "./context/UserActionContext";
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 5000,
    cacheTime: 1500,
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
      </BrowserRouter>
      <ScrollToTopPage top={800} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
