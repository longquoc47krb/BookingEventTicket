import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import AppStyle from "./assets/AppStyle";
function App() {
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
      {/* <EventDashBoard /> */}
    </div>
  );
}

export default App;
