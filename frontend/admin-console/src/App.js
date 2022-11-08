/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Overview,
  Orders,
  Calendar,
  Events,
  Stacked,
  Pyramid,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Editor,
  Tickets,
} from "./pages";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import AddEvent from "./pages/AddEvent";

function App() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg  bg-main-bg min-h-screen  w-full
              ${activeMenu ? "md:ml-72" : "flex-2"}
                `}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Overview />} />
                <Route path="/overview" element={<Overview />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/create" element={<AddEvent />} />
                <Route path="/tickets" element={<Tickets />} />

                {/* apps  */}
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
