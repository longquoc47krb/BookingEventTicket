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
const updateBioAndAddress = async (id, body) => {
  try {
    const response = await httpRequest(
      OrganizationAPI.updateBioAndAddress(id, body)
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const getOrganizerByEmail = async (email) => {
  try {
    const response = await httpRequest(
      OrganizationAPI.findOrganizerByEmail(email)
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const createTemplateTicket = async (id, body) => {
  try {
    const response = await httpRequest(
      OrganizationAPI.createTemplateTicket(id, body)
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
const getTemplateTicket = async (id) => {
  try {
    const response = await httpRequest(OrganizationAPI.getTemplateTicket(id));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const findOrganizerById = async (id) => {
  try {
    const response = await httpRequest(OrganizationAPI.findOrganizerById(id));
    return response.data;
  } catch (error) {}
};
const findAllOrganizers = async () => {
  try {
    const response = await httpRequest(OrganizationAPI.findAllOrganizers);
    return response.data;
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
export const useFetchTemplateTicket = (id) => {
  return useQuery(["getTemplateTicket", id], () => getTemplateTicket(id), {
    staleTime: 30000,
    refetchInterval: 5000,
  });
};
export const useFetchOrganizerByEmail = (email) => {
  return useQuery(
    ["getOrganizerByEmail", email],
    () => getOrganizerByEmail(email),
    {
      staleTime: 30000,
      refetchInterval: 5000,
    }
  );
};
export const useFetchAllOrganizers = () => {
  return useQuery(["findAllOrganizers"], findAllOrganizers, {
    staleTime: 30000,
    refetchInterval: 5000,
  });
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
const organizationServices = {
  submitOrganizer,
  getEventsByOrganizationId,
  getOrganizerByEmail,
  updateBioAndAddress,
  findOrganizerById,
  createTemplateTicket,
  getTemplateTicket,
};
export default organizationServices;
