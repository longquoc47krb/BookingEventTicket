export const CustomerAPI = {
  getWishlist: (userId) => ({
    url: `/customer/wishlist/${userId}`,
    method: "GET",
  }),
  addWishlist: (id, userId) => ({
    url: `/customer/wishlist/${userId}`,
    method: "POST",
    params: {
      idItem: id,
    },
  }),
  removeWishlist: (id, userId) => ({
    url: `/customer/wishlist/${id}`,
    method: "DELETE",
    params: {
      userId,
    },
  }),
  clearWishlist: (userId) => ({
    url: `/customer/wishlist/all/${userId}`,
    method: "DELETE",
  }),
  createOrder: (userId, data) => ({
    url: `/customer/order/${userId}`,
    method: "POST",
    data,
  }),
  findFollowedOrganizerList: (userId) => ({
    url: `/customer/followedOrganizer/${userId}`,
    method: "GET",
  }),
  followOrg: (userId, organizerEmail) => ({
    url: `/customer/followedOrganizer/${userId}`,
    method: "POST",
    data: {
      email: organizerEmail,
    },
  }),
  unfollowOrg: (userId, organizerEmail) => ({
    url: `/customer/followedOrganizer/${userId}`,
    method: "DELETE",
    data: {
      email: organizerEmail,
    },
  }),
  checkIsFollowedOrganizer: (userId, organizerEmail) => ({
    url: `/customer/checkFollowedOrganizer/${userId}`,
    method: "GET",
    params: {
      organizerEmail,
    },
  }),
  findAllCustomer: {
    url: "/customer/findAll",
    method: "GET",
  },
};
