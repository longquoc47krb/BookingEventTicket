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
  addOrganizerBio: (email, data) => ({
    url: `/organization/addBio/${email}`,
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
