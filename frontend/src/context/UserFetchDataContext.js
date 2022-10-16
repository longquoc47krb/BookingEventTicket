import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { useFetchCategories } from "../api/services/categoryServices";
import eventServices, {
  useCheckEventsStatus,
  useEventDetails,
  useFetchEventsByFilter,
  useFetchEvents,
  useFetchFeaturedEvents,
} from "../api/services/eventServices";
import { useLocationName } from "../api/services/generalServices";
import { AlertPopup } from "../components/common/alert";
import { filterSelector } from "../redux/slices/filterSlice";
import constants, { TicketStatus } from "../utils/constants";
const { provinceMapping } = constants;
const UserFetchDataContext = createContext();
export const UserFetchDataContextProvider = ({ children }) => {
  const filter = useSelector(filterSelector);
  console.log({ filter });
  const { data: featuredEventsFetching, status: highlightStatus } =
    useFetchFeaturedEvents();
  const { data: EventStatusFetching, status: eventstatusStatus } =
    useCheckEventsStatus();
  const { data: allEventsFetching, status: allEventsStatus } = useFetchEvents();
  const { data: location, status: locationStatus } = useLocationName();
  const { data: categories, status: categoryStatus } = useFetchCategories();
  const { data: eventsByProvinceFetching, status: eventsByProvinceStatus } =
    useFetchEventsByFilter({
      province: provinceMapping.get(location ? location?.region : ""),
      status: TicketStatus.AVAILABLE,
    });
  const { data: filterEvents, status: filterEventStatus } =
    useFetchEventsByFilter({
      province: provinceMapping.get(location ? location?.region : ""),
      status: TicketStatus.AVAILABLE,
    });
  const loadingStatus =
    highlightStatus === "loading" ||
    eventstatusStatus === "loading" ||
    eventsByProvinceStatus === "loading" ||
    categoryStatus === "loading" ||
    allEventsStatus === "loading";
  const errorStatus =
    highlightStatus === "error" ||
    eventstatusStatus === "error" ||
    eventsByProvinceStatus === "error" ||
    categoryStatus === "error" ||
    allEventsStatus === "error";
  const successStatus =
    highlightStatus === "success" ||
    eventstatusStatus === "success" ||
    eventsByProvinceStatus === "success" ||
    categoryStatus === "success" ||
    allEventsStatus === "success";
  if (successStatus) {
    var featuredEvents = featuredEventsFetching;
    var eventsStatus = EventStatusFetching;
    var eventsByProvince = eventsByProvinceFetching;
    var allEvents = allEventsFetching;
  }
  return (
    <UserFetchDataContext.Provider
      value={{
        featuredEvents,
        eventsStatus,
        eventsByProvince,
        loadingStatus,
        errorStatus,
        successStatus,
        allEvents,
        categories,
      }}
    >
      {children}
    </UserFetchDataContext.Provider>
  );
};
export const useUserFetchDataContext = () => {
  const context = useContext(UserFetchDataContext);
  return context;
};
