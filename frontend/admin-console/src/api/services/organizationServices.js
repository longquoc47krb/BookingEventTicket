import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../services/httpRequest";
import { OrganizationAPI } from "../configs/organization";

const submitOrganizer = async (body) => {
  try {
    const response = await httpRequest(OrganizationAPI.submitOrganizer(body));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const getEventsByOrganizationId = async (id) => {
  try {
    const response = await httpRequest(OrganizationAPI.findEventByOrgId(id));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const useFetchEventsByOrgID = (id) => {
  return useQuery(
    ["getEventsByOrganizationId", id],
    () => getEventsByOrganizationId(id),
    {
      staleTime: 30000,
      refetchInterval: 5000,
    }
  );
};
const organizationServices = { submitOrganizer, getEventsByOrganizationId };
export default organizationServices;
