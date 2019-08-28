import { connect } from "react-redux";
import RentalCompanies from "./RentalCompanies";
import {
  FETCH_RENTAL_COMPANIES,
  CREATE_RENTAL_COMPANIES,
  EDIT_RENTAL_COMPANIES
} from "../../reducers/rentalCompanies.js";

const mapStateToProps = state => ({
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchRentalCompanies: ({ token }) =>
    dispatch({ type: FETCH_RENTAL_COMPANIES, payload: { token } }),
  createRentalCompany: ({
    token,
    name,
    address,
    image,
    rating,
    perks,
    locationAlias
  }) =>
    dispatch({
      type: CREATE_RENTAL_COMPANIES,
      payload: { token, name, address, image, rating, perks, locationAlias }
    }),
  editRentalCompany: ({ token, rentalCompanyId, fieldToUpdate }) =>
    dispatch({
      type: EDIT_RENTAL_COMPANIES,
      payload: { token, rentalCompanyId, fieldToUpdate }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalCompanies);
