import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminLoginPage,
  EventDashBoardPage,
  EventDetailPage,
  HomePage,
  LoginPage,
} from "./configs/routes";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import NotFoundPage from "./views/not-found";
import UserProfile from "./views/user-profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import ScrollToTopPage from "./components/scroll-to-top";
import { Navigate } from "react-router-dom";
import OrganizeRegistration from "./views/be-an-organization";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 12,
      staleTime: 1000,
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventDashBoardPage />} />
            <Route path="/event/:eventId" element={<EventDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={<UserProfile />}
              // <Route
              //   path="/profile"
              //   roles={[Role.User]}
              //   element={
              //     <UserRoute
              //       roles={[Role.User]}
              //       component={UserProfile}
              //     ></UserRoute>
              //   }
            />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
              path="/be-an-organization"
              element={<OrganizeRegistration />}
            />
            "
            <Route path="/page-not-found" element={<NotFoundPage />} />
            <Route
              path="/*"
              element={<Navigate to="/page-not-found" replace />}
            />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
      <ScrollToTopPage top={800} />
    </QueryClientProvider>
  );
}

export default App;
