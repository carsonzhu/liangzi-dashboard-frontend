import { connect } from "react-redux";
import Cars from "./Cars";

import {
  FETCH_VEHICLES,
  ADD_VEHICLES,
  UPDATE_VEHICLES
} from "../../reducers/cars";
import { FETCH_INSURANCES } from "../../reducers/insurances";
import { SUPER_ADMIN } from "../../constants";

const mapStateToProps = state => ({
  isLoading: state.cars.loading,
  vehicles: state.cars.vehicles,
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies,
  userType: state.login.userType,
  insurances: state.insurances.insurances,
  error: state.cars.error,
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles: ({ token }) =>
    dispatch({ type: FETCH_VEHICLES, payload: { token } }),
  fetchInsurances: ({ token }) =>
    dispatch({ type: FETCH_INSURANCES, payload: { token } }),
  updateVehicles: ({ token, vehicleId, fieldToUpdate }) =>
    dispatch({
      type: UPDATE_VEHICLES,
      payload: { token, vehicleId, fieldToUpdate }
    }),
  addVehicle: ({
    token,
    dailyRate,
    dailyRateUnit,
    locationAddress,
    locationHours,
    specialServices,
    transmission,
    vehicleType,
    trunkSize,
    seats,
    rentalCompanyId,
    vehicleMake,
    vehicleImage,
    vehicleNotes,
    insuranceIds
  }) =>
    dispatch({
      type: ADD_VEHICLES,
      payload: {
        token,
        dailyRate,
        dailyRateUnit,
        locationAddress,
        locationHours,
        specialServices,
        transmission,
        vehicleType,
        trunkSize,
        seats,
        rentalCompanyId,
        vehicleMake,
        vehicleImage,
        vehicleNotes,
        insuranceIds
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);
