export const OrganizationAPI = {
  submitOrganizer: (data) => ({
    url: "/form/organization",
    method: "POST",
    data,
  }),
  findOrganizerById: (id) => ({
    url: `/organization`,
    method: "GET",
    params: {
      id,
    },
  }),
};
