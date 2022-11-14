export const OrganizationAPI = {
  submitOrganizer: (data) => ({
    url: "/organization",
    method: "POST",
    data,
  }),
  findOrganizerById: (id) => ({
    url: `/organization/${id}`,
    method: "GET",
  }),
};
