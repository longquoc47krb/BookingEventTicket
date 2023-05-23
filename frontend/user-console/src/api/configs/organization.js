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
  findOrganizerEventList: (email) => ({
    url: `/event/list/${email}`,
    method: "GET",
  })
};
