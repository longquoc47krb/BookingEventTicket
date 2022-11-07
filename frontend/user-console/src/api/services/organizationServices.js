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
const organizationServices = { submitOrganizer };
export default organizationServices;
