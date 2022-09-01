import ScrollToTopPage from "./components/scroll-to-top";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EventDashBoard from "./views/event-dashboard";
import { Components } from "./configs/routes";
import Loading from "./components/loading";
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
          path='/events'
          element={<Components.EventDashBoardPage events={events} />}
        />
      </Routes>
    );
  }
  function GuessRoutes() {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/login' replace />} />
        <Route
          path='/events'
          element={<Components.EventDashBoardPage events={events} />}
        />
        <Route path='/login' element={<Components.LoginPage />} />
        <Route path='/admin-login' element={<Components.AdminLoginPage />} />
      </Routes>
    );
  }
  if (!currentUser) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<GuessRoutes />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } else if (currentUser?.role === 4) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
