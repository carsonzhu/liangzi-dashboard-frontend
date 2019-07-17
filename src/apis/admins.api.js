import axios from "axios";

//Admin User
const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const ADMIN_API = `${LIANG_ZI_BACKEND_URL}/apis/admins`;

export const addAdminRequest = ({
  email,
  password,
  userType,
  allowedOperations,
  username,
  token
}) => {
  const addAdminRequestJSONTransform = json => {
    const { newUser } = json.data.data;

    return { admin: newUser };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: ADMIN_API,
      data: {
        email,
        password,
        userType,
        username,
        allowedOperations
      },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(addAdminRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const updateAdminRequest = ({ userId, fieldToUpdate, token }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: ADMIN_API,
      data: {
        userId,
        fieldToUpdate
      },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(json);
      })
      .catch(reject);
  });
};

export const fetchAdminsRequest = ({ token }) => {
  const fetchUsersRequestJSONTransform = json => {
    const { users } = json.data.data;

    return { admins: users };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: ADMIN_API,
      headers: {
        authorization: token
      }
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

// NOT USED
export const fetchSingleAdminRequest = ({ userId }) => {
  return axios({
    method: "get",
    url: `${ADMIN_API}/${userId}`
  });
};

export const deleteAdminRequest = ({ userId }) => {
  return axios({
    method: "delete",
    url: ADMIN_API,
    data: {
      userId
    }
  });
};
