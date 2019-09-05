import { connect } from "react-redux";
import Insurances from "./Insurances";
import {
  FETCH_INSURANCES,
  EDIT_INSURANCE,
  CREATE_NEW_INSURANCE,
  DELETE_INSURANCE
} from "../../reducers/insurances";

const mapStateToProps = state => ({
  isLoading: state.insurances.loading,
  insurances: state.insurances.insurances,
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies,
  error: state.insurances.error,
  userType: state.login.userType
});

const mapDispatchToProps = dispatch => ({
  fetchInsurances: ({ token }) =>
    dispatch({ type: FETCH_INSURANCES, payload: { token } }),
  editInsurance: ({ insuranceId, fieldToUpdate, token }) =>
    dispatch({
      type: EDIT_INSURANCE,
      payload: { insuranceId, fieldToUpdate, token }
    }),
  deleteInsurance: ({ insuranceId, token }) =>
    dispatch({
      type: DELETE_INSURANCE,
      payload: { insuranceId, token }
    }),
  createNewInsurances: ({
    rentalCompanyId,
    rentalCompanyName,
    name,
    description,
    dailyRate,
    dailyRateUnit,
    token
  }) =>
    dispatch({
      type: CREATE_NEW_INSURANCE,
      payload: {
        rentalCompanyId,
        rentalCompanyName,
        name,
        description,
        dailyRate,
        dailyRateUnit,
        token
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Insurances);
