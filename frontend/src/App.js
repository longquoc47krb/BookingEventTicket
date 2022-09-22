import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { UserRoute } from "./components/routes/UserRoute";
import {
  AdminLoginPage,
  EventDashBoardPage,
  EventDetailPage,
  HomePage,
  LoginPage,
} from "./configs/routes";
import { Role } from "./helpers/role";
import NotFoundPage from "./views/not-found";
import UserProfile from "./views/user-profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventDashBoardPage />} />
        <Route path="/event/:eventName" element={<EventDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          roles={[Role.User]}
          element={
            <UserRoute roles={[Role.User]} component={UserProfile}></UserRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
