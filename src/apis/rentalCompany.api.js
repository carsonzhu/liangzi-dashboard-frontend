import axios from "axios";

const LIANG_ZI_BACKEND_URL = process.env.REACT_APP_LIANG_ZI_BACKEND_URL;
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
  locationAlias
}) => {
  const createRentalCompanyRequestJSONTransform = json => {
    const { rentalCompanies } = json.data.data;

    return { rentalCompanies };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: RENTAL_COMPANY_API,
      data: { name, address, image, rating, perks, locationAlias },
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
