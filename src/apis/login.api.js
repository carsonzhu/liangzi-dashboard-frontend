import axios from "axios";

const LIANG_ZI_BACKEND_URL = process.env.LIANG_ZI_BACKEND_URL;
const LOGIN_API = `${LIANG_ZI_BACKEND_URL}/apis/authentication/login`;
const REGISTER_API = `${LIANG_ZI_BACKEND_URL}/apis/authentication/register/email`;

// Request
export const loginRequest = ({ email, password }) => {
  // DEV: fake login
  const isDev =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

  if (isDev) {
    switch (password) {
      case "error": {
        return Promise.reject({ error: "incorrect" });
      }
      case "super": {
        return Promise.resolve({
          userType: "superAdmin",
          token: "abc123",
          userId: "abc123",
          username: "abc123"
        });
      }

      default: {
        return Promise.resolve({
          userType: "normalAdmin",
          token: "abc123",
          userId: "abc123",
          username: "abc123"
        });
      }
    }
  }

  return axios({
    method: "post",
    url: LOGIN_API,
    data: {
      email,
      password
    }
  });
};

// TODO: determine the registration flow
export const registerRequest = ({ email, password, userType, username }) => {
  const allowedOperations = ["cars", "users", "insurances", "transactions"];

  return axios({
    method: "post",
    url: REGISTER_API,
    data: {
      email,
      password,
      userType,
      username,
      allowedOperations,
      isActive: true
    }
  });
};
