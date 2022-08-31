import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import AppStyle from "./configs/AppStyle";
import EventDashBoard from "./views/EventDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8000/event");
      setEvents(res.data);
    };
    fetch();
  }, []);
  return (
    <div className='h-[200vh]'>
      <ScrollToTop
        smooth
        style={{ background: AppStyle.colors.primary }}
        component={
          <button className='text-white text-2xl'>
            <BiArrowToTop />
          </button>
        }
      />
      <EventDashBoard events={events} />
    </div>
  );
}

export default App;
