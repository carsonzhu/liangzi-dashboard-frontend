import { all } from "redux-saga/effects";
import Login from "./login";
import ComponentState from "./componentState";
import Admins from "./admins";
import Cars from "./cars";
import Insurances from "./insurances";
import RentalCompanies from "./rentalCompanies";

export default function* rootSaga() {
  yield all([
    ...Login,
    ...ComponentState,
    ...Admins,
    ...Cars,
    ...Insurances,
    ...RentalCompanies
  ]);
}
