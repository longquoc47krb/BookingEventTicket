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

const queryClient = new QueryClient();
function App() {
  // Create a client
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventDashBoardPage />} />
            <Route path="/event/:eventName" element={<EventDetailPage />} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
