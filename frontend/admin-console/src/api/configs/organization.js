export const OrganizationAPI = {
  submitOrganizer: (data) => ({
    url: "/organization",
    method: "POST",
    data,
  }),
  findEventByOrgId: (userid) => ({
    url: `/organization/event/list/${userid}`,
    method: "GET",
  }),
  findOrganizerByEmail: (email) => ({
    url: `/organization/${email}`,
    method: "GET",
  }),
  addOrganizerBio: (id, data) => ({
    url: `/organization/bio/${id}`,
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
