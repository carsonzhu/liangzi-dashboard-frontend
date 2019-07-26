import axios from "axios";

const REACT_APP_LIANG_ZI_BACKEND_URL =
  process.env.REACT_APP_LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const RENTAL_COMPANY_API = `${REACT_APP_LIANG_ZI_BACKEND_URL}/apis/rentalCompanies`;

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
