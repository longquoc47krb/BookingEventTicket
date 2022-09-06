import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { Components } from "./configs/routes";
import PublicLayout from "./views/layouts/PublicLayout";
function App() {
  const [events, setEvents] = useState(null);
  const currentUser = localStorage.getItem("user");
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8000/events");
      setEvents(res.data);
    };
    fetch();
  }, []);
  function AdminRoutes() {
    return;
  }
  function UserRoutes() {
    return (
      <Routes>
        <Route
          path="/events"
          element={<Components.EventDashBoardPage events={events} />}
        />
      </Routes>
    );
  }
  function GuessRoutes() {
    return (
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route
            path="/events"
            element={<Components.EventDashBoardPage events={events} />}
          />
          <Route path="/" element={<Components.HomePage />} />
          {/* <Route path="/test" element={<Loading />} /> */}
        </Route>
        <Route path="/login" element={<Components.LoginPage />} />
        <Route path="/admin-login" element={<Components.AdminLoginPage />} />
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
