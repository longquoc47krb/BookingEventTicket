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
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import routes, { privateRoutes } from "./helper/routes";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { tokenSelector } from "./redux/slices/accountSlice";
import Layout from "./pages/Layout";

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
  const token = useSelector(tokenSelector);
  return (
    <QueryClientProvider client={queryClient}>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <Routes>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
              <Route element={<PrivateRoute isAuth={token} />}>
                <Route element={<Layout />} path="/">
                  {privateRoutes.map((route) => (
                    <Route path={route.path} element={route.element} />
                  ))}
                </Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
