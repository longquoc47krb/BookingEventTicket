import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import {
  AdminLoginPage,
  EventDashBoardPage,
  EventDetailPage,
  HomePage,
  LoginPage,
} from "./configs/routes";
import PublicLayout from "./views/layouts/PublicLayout";
import UserProfile from "./views/user-profile";
function App() {
  const currentUser = localStorage.getItem("user");
  function AdminRoutes() {
    return;
  }
  function UserRoutes() {
    return (
      <Routes>
        <Route path="/events" element={<EventDashBoardPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    );
  }
  function GuessRoutes() {
    return (
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/events" element={<EventDashBoardPage />} />
          <Route path="/event/:eventName" element={<EventDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Loading />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    );
  }
  if (!currentUser || currentUser) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<GuessRoutes />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } else if (currentUser?.role === 4) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
