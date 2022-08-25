import Event from "./components/container/event";
import HeroBanner from "./components/container/hero";
import Header from "./components/presentation/header";
import ScrollToTop from "react-scroll-to-top";
import { BiArrowToTop } from "react-icons/bi";
import theme from "./shared/theme";
function App() {
  return (
    <div className='container'>
      <Header />
      <HeroBanner />
      <div class='grid-cols-3 gap-y-10 grid px-10 py-5'>
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
      </div>
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
