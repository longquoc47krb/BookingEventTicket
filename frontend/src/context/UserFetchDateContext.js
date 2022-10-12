import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { reactLocalStorage } from "reactjs-localstorage";
import eventServices, {
  useCompletedEvents,
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
  const { data: completedEventsFetching, status: completedEventsStatus } =
    useCompletedEvents();
  const { data: allEventsFetching, status: allEventsStatus } = useFetchEvents();
  const { data: location, status: locationStatus } = useLocationName();
  const { data: eventsByProvinceFetching, status: eventsByProvinceStatus } =
    useEventsByProvince(provinceMapping.get(location ? location?.region : ""));
  const loadingStatus =
    highlightStatus === "loading" ||
    completedEventsStatus === "loading" ||
    eventsByProvinceStatus === "loading" ||
    allEventsStatus === "loading";
  const errorStatus =
    highlightStatus === "error" ||
    completedEventsStatus === "error" ||
    eventsByProvinceStatus === "error" ||
    allEventsStatus === "error";
  const successStatus =
    highlightStatus === "success" ||
    completedEventsStatus === "success" ||
    eventsByProvinceStatus === "success" ||
    allEventsStatus === "success";
  if (successStatus) {
    var featuredEvents = featuredEventsFetching;
    var completedEvents = completedEventsFetching;
    var eventsByProvince = eventsByProvinceFetching;
    var allEvents = allEventsFetching;
  }
  return (
    <UserFetchDataContext.Provider
      value={{
        featuredEvents,
        completedEvents,
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
