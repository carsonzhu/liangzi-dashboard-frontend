import axios from "axios";

//Admin User
const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const ADMIN_API = `${LIANG_ZI_BACKEND_URL}/apis/admins`;

export const addUserRequest = ({
  email,
  password,
  userType,
  allowedOperations,
  username
}) => {
  return axios({
    method: "post",
    url: ADMIN_API,
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
    url: ADMIN_API,
    data: {
      userId,
      fieldToUpdate
    }
  });
};

export const deleteUserRequest = ({ userId }) => {
  return axios({
    method: "delete",
    url: ADMIN_API,
    data: {
      userId
    }
  });
};

export const fetchUsersRequest = () => {
  const fetchUsersRequestJSONTransform = json => {
    const { users } = json.data.data;

    return { admins: users };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: ADMIN_API
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(fetchUsersRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const fetchSingleUserRequest = ({ userId }) => {
  return axios({
    method: "get",
    url: `${ADMIN_API}/${userId}`
  });
};
