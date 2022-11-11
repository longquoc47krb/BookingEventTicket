import React from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

function Layout() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
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
          <div
            className={
              "fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full "
            }
          >
            <Navbar />
          </div>
          <div className={!activeMenu ? "w-screen" : "w-[calc(100vw-294px)]"}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
