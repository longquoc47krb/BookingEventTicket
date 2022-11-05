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
};
