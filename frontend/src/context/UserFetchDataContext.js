import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { reactLocalStorage } from "reactjs-localstorage";
import eventServices, {
  useCheckEventsStatus,
  useEventDetails,
  useEventsByProvince,
  useFetchEvents,
  useFetchFeaturedEvents,
} from "../api/services/eventServices";
import { useLocationName } from "../api/services/generalServices";
import { AlertPopup } from "../components/common/alert";
import constants from "../utils/constants";
const { provinceMapping } = constants;
const UserFetchDataContext = createContext();
export const UserFetchDataContextProvider = ({ children }) => {
  const { data: featuredEventsFetching, status: highlightStatus } =
    useFetchFeaturedEvents();
  const { data: EventStatusFetching, status: eventstatusStatus } =
    useCheckEventsStatus();
  const { data: allEventsFetching, status: allEventsStatus } = useFetchEvents();
  const { data: location, status: locationStatus } = useLocationName();
  const { data: eventsByProvinceFetching, status: eventsByProvinceStatus } =
    useEventsByProvince(provinceMapping.get(location ? location?.region : ""));
  const loadingStatus =
    highlightStatus === "loading" ||
    eventstatusStatus === "loading" ||
    eventsByProvinceStatus === "loading" ||
    allEventsStatus === "loading";
  const errorStatus =
    highlightStatus === "error" ||
    eventstatusStatus === "error" ||
    eventsByProvinceStatus === "error" ||
    allEventsStatus === "error";
  const successStatus =
    highlightStatus === "success" ||
    eventstatusStatus === "success" ||
    eventsByProvinceStatus === "success" ||
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
