import axios from "axios";

import { LIANG_ZI_BACKEND_URL } from "./utilities";

const RENTAL_COMPANY_API = `${LIANG_ZI_BACKEND_URL}/apis/rentalCompanies`;

export const getRentalCompaniesRequest = ({ token }) => {
  const fetchRentalCompanyRequestJSONTransform = json => {
    const { rentalCompanies } = json.data.data;

    return { rentalCompanies };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: RENTAL_COMPANY_API,
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(fetchRentalCompanyRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const createRentalCompaniesRequest = ({
  token,
  name,
  address,
  image,
  rating,
  perks,
  locationAlias,
  companyRepName,
  companyPhoneNumber
}) => {
  const createRentalCompanyRequestJSONTransform = json => {
    const { newRentalCompany } = json.data.data;

    return { rentalCompany: newRentalCompany };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: RENTAL_COMPANY_API,
      data: {
        name,
        address,
        image,
        rating,
        perks,
        locationAlias,
        companyRepName,
        companyPhoneNumber
      },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(createRentalCompanyRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const editRentalCompaniesRequest = ({
  token,
  rentalCompanyId,
  fieldToUpdate
}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: RENTAL_COMPANY_API,
      data: {
        rentalCompanyId,
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
