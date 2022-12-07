import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ROLE } from "../utils/constants";
import { OrganizerRoute, AdminRoute } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { useTranslation } from "react-i18next";
import UnitedKingdomFlag from "../assets/united-kingdom-flag.png";
import VietnamFlag from "../assets/vietnam-flag.png";

const Sidebar = ({ role }) => {
  const { t, i18n } = useTranslation();
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-md shadow-gray-400 relative">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="logo"
                className="w-20 h-auto"
              />
              <span className="text-primary">Lotus Ticket</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 relative">
            {role === ROLE.Organizer
              ? OrganizerRoute.map((item) => (
                  <div key={item.title}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                      {t(item.title)}
                    </p>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.route}`}
                        key={link.route}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                          color: "#1f3e82"
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize ">{t(link.name)}</span>
                      </NavLink>
                    ))}
                  </div>
                ))
              : AdminRoute.map((item) => (
                  <div key={item.title}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                      {t(item.title)}
                    </p>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.route}`}
                        key={link.route}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                          color: "#1f3e82"
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize ">{t(link.name)}</span>
                      </NavLink>
                    ))}
                  </div>
                ))}
          </div>
        </>
      )}
      <div className="absolute bottom-4 left-4 flex items-center gap-x-4">
        <span>{t("choose-language")}</span>
        <img
          src={UnitedKingdomFlag}
          alt="UK"
          onClick={() => {
            i18n.changeLanguage("en");
          }}
          className="h-[1.5rem] w-auto cursor-pointer"
        />
        <img
          src={VietnamFlag}
          alt="UK"
          onClick={() => {
            i18n.changeLanguage("vn");
          }}
          className="h-[1.5rem] w-auto cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
