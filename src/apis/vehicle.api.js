import axios from "axios";
import _ from "lodash";

const SEARCH_VEHICLE_API = process.env.REACT_APP_SEARCH_VEHICLE_API;

export const searchQueryBuilder = () => {
  const query = {
    pickupLocation: "",
    pickupDateTime: "",
    returnLocation: "",
    returnDateTime: "",
    types: [],
    minSeats: 0,
    maxSeats: Infinity,
    companies: [],
    services: []
  };
  return {
    pickupFrom: function(location) {
      query.pickupLocation = location;
      return this;
    },
    pickupAt: function(dateTime) {
      query.pickupDateTime = dateTime;
      return this;
    },
    returnFrom: function(location) {
      query.returnLocation = location;
      return this;
    },
    returnAt: function(dateTime) {
      query.returnDateTime = dateTime;
      return this;
    },
    withinCarTypes: function(types) {
      query.types = types;
      return this;
    },
    minSeats: function(n) {
      query.minSeats = n;
      return this;
    },
    maxSeats: function(n) {
      query.maxSeats = n;
      return this;
    },
    fromCompanies: function(companies) {
      query.companies = companies;
      return this;
    },
    addServices: function(services) {
      query.services = services;
      return this;
    },
    build: () => query
  };
};

const mapResponseToVehicle = res => ({
  id: res.id,
  dailyRate: res.Daily_rate,
  hourlyRate: res.Hourly_rate,
  services: res.Specials,
  seats: res.Seats,
  company: res.Rental_company,
  type: res.Vehicle_type
});

const matchVehicleWith = query => vehicle => {
  return (
    vehicle.seats >= query.minSeats &&
    vehicle.seats <= query.maxSeats &&
    query.types.includes(vehicle.type) &&
    query.companies.includes(vehicle.company) &&
    _.intersection(query.services, vehicle.services).length > 0
  );
};

export const search = query => {
  //TODO: test using real search params
  return fetch(SEARCH_VEHICLE_API)
    .then(response => response.json())
    .then(arr => arr.map(mapResponseToVehicle))
    .then(vehicles => vehicles.filter(matchVehicleWith(query)));
};

//////////////////////////////////////////
const LIANG_ZI_BACKEND_URL =
  process.env.LIANG_ZI_BACKEND_URL || "http://localhost:4000";
const VEHICLE_API = `${LIANG_ZI_BACKEND_URL}/apis/vehicles`;

export const fetchVehiclesRequest = ({ token }) => {
  const fetchVehiclesRequestJSONTransform = json => {
    const { vehicles } = json.data.data;

    return { vehicles };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: VEHICLE_API,
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(fetchVehiclesRequestJSONTransform(json));
      })
      .catch(reject);
  });
};
