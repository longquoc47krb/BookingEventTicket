import httpRequest from "../services/httpRequest";

export const postLoginToken = async (token) => {
  try {
    const response = await httpRequest({
      url: "/oauth/login",
      method: "POST",
      data: token,
    });
    if (!response.ok) throw new Error("bad server condition");
    return true;
  } catch (e) {
    console.error("postLoginToken Error: ", e.message);
    return false;
  }
};
