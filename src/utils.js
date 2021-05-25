const BASE_URL_DEV = "http://127.0.0.1:5000";

export { BASE_URL_DEV };

export const fetchAuth = () => {
  const auth = JSON.parse(localStorage.getItem("authDetails"));
  if (
    !auth ||
    !auth.authToken ||
    !auth.userPublicId ||
    !auth.username ||
    !auth.email ||
    !auth.expiry
  ) {
    return null;
  }
  if(auth.expiry < Date.parse(new Date())) return null;
  return {
    authToken: auth.authToken,
    auth_token: auth.authToken,
    userPublicId: auth.userPublicId,
    username: auth.username,
    email: auth.email,
    expiry: auth.expiry,
  };
};
