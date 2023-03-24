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
    url: `/email/organization/${email}`,
    method: "GET",
  }),
  updateBioAndAddress: (id, data) => ({
    url: `/organization/organizerProfile/${id}`,
    method: "POST",
    data,
  }),
  findAllOrganizers: {
    url: `/organization/findAll`,
    method: "GET",
  },
  findOrganizerById: (id) => ({
    url: `/organization`,
    method: "GET",
    params: {
      id,
    },
  }),
  createTemplateTicket: (id, data) => ({
    url: `/organization/templateTickets/${id}`,
    method: "POST",
    data,
  }),
  getTemplateTicket: (id) => ({
    url: `/organization/templateTickets/${id}`,
    method: "GET",
  }),
  refuseOrganizer: (data) => ({
    url: `/admin/refuse/organization`,
    method: "POST",
    data,
  }),
  approveOrganizer: (data) => ({
    url: `/admin/approve/organization`,
    method: "POST",
    data,
  }),
  statistic: (userId) => ({
    url: `/organization/statistic/${userId}`,
    method: "GET"
  }),
  getPaymentListByOrganizerID: (userId) => ({
    url: `/organization/payment/${userId}`,
    method: "GET"
  })
};
