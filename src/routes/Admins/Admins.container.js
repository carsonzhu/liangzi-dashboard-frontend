import { connect } from "react-redux";
import Admins from "./Admins";
import {
  FETCH_ADMINS,
  EDIT_ADMINS,
  CREATE_NEW_ADMINS
} from "../../reducers/admins";

const mapStateToProps = state => ({
  isLoading: state.admins.loading,
  admins: state.admins.admins,
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: ({ token }) =>
    dispatch({ type: FETCH_ADMINS, payload: { token } }),
  editAdmin: ({ userId, fieldToUpdate, token }) =>
    dispatch({ type: EDIT_ADMINS, payload: { userId, fieldToUpdate, token } }),
  createNewAdmin: ({
    email,
    password,
    userType,
    username,
    allowedOperations,
    token,
    rentalCompanyId
  }) =>
    dispatch({
      type: CREATE_NEW_ADMINS,
      payload: {
        email,
        password,
        userType,
        username,
        allowedOperations,
        token,
        rentalCompanyId
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins);
