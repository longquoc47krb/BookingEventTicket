import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import theme from "./shared/theme";
import EventDashBoard from "./views/EventDashboard";
function App() {
  return (
    <div>
      <EventDashBoard />
      <ScrollToTop
        smooth
        style={{ background: theme.main }}
        component={
          <button className='text-white text-2xl'>
            <BiArrowToTop />
          </button>
        }
      />
    </div>
  );
}

export default App;
