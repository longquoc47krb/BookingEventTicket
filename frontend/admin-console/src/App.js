/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "./components";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
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
import AddEditEvent from "./pages/AddEditEvent";
import routes from "./helper/routes";

function App() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();
  const queryClient = new QueryClient({
    defaultOptions: {
      staleTime: 30000,
      cacheTime: 1000 * 60 * 60 * 24,
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }, []);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
                  {routes.map((route) => (
                    <Route path={route.path} element={route.element} />
                  ))}
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
