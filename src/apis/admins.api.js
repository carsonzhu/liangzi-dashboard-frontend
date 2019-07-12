import axios from "axios";

//Admin User
const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const ADMIN_API = `${LIANG_ZI_BACKEND_URL}/apis/admins`;

// TODO: add to

/*
kenheaders: {
      'authorization': 'Basic Y2xpZW50OnNlY3JldA=='
    }
    */

export const addAdminRequest = ({
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

export const updateAdminRequest = ({ userId, fieldToUpdate }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: ADMIN_API,
      data: {
        userId,
        fieldToUpdate
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

export const deleteAdminRequest = ({ userId }) => {
  return axios({
    method: "delete",
    url: ADMIN_API,
    data: {
      userId
    }
  });
};

export const fetchAdminsRequest = () => {
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

export const fetchSingleAdminRequest = ({ userId }) => {
  return axios({
    method: "get",
    url: `${ADMIN_API}/${userId}`
  });
};
