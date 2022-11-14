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
};
