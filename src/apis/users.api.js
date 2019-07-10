import axios from "axios";

//Admin User
const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const USER_API = `${LIANG_ZI_BACKEND_URL}/apis/admins`;

export const addUserRequest = ({
  email,
  password,
  userType,
  allowedOperations,
  username
}) => {
  return axios({
    method: "post",
    url: USER_API,
    data: {
      email,
      password,
      userType,
      username,
      allowedOperations
    }
  });
};

export const updateUserRequest = ({ userId, fieldToUpdate }) => {
  return axios({
    method: "put",
    url: USER_API,
    data: {
      userId,
      fieldToUpdate
    }
  });
};

export const deleteUserRequest = ({ userId }) => {
  return axios({
    method: "delete",
    url: USER_API,
    data: {
      userId
    }
  });
};

export const fetchUsersRequest = () => {
  return axios({
    method: "get",
    url: USER_API
  });
};

export const fetchSingleUserRequest = ({ userId }) => {
  return axios({
    method: "get",
    url: `${USER_API}/${userId}`
  });
};
