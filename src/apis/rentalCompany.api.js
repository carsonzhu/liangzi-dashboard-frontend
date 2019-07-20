import axios from "axios";

const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const RENTAL_COMPANY_API = `${LIANG_ZI_BACKEND_URL}/apis/rentalCompanies`;

export const getRentalCompaniesRequest = () => {};
