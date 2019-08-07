import axios from "axios";

//Insurance User
import { LIANG_ZI_BACKEND_URL } from "./utilities";

const INSURANCE_API = `${LIANG_ZI_BACKEND_URL}/apis/insurances`;

export const addInsuranceRequest = ({
  rentalCompanyId,
  rentalCompanyName,
  name,
  description,
  dailyRate,
  dailyRateUnit,
  token
}) => {
  const addInsuranceRequestJSONTransform = json => {
    const { newInsurance } = json.data.data;

    return { insurance: newInsurance };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: INSURANCE_API,
      data: {
        rentalCompanyId,
        rentalCompanyName,
        name,
        description,
        dailyRate,
        dailyRateUnit
      },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(addInsuranceRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const updateInsuranceRequest = ({
  insuranceId,
  fieldToUpdate,
  token
}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: INSURANCE_API,
      data: {
        insuranceId,
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

export const fetchInsurancesRequest = ({ token }) => {
  const fetchUsersRequestJSONTransform = json => {
    const { insurances } = json.data.data;

    return { insurances: insurances };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: INSURANCE_API,
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
export const fetchSingleInsuranceRequest = ({ insuranceId }) => {
  return axios({
    method: "get",
    url: `${INSURANCE_API}/${insuranceId}`
  });
};

export const deleteInsuranceRequest = ({ insuranceId, token }) => {
  return axios({
    method: "delete",
    url: INSURANCE_API,
    data: {
      insuranceId
    },
    headers: {
      authorization: token
    }
  });
};
