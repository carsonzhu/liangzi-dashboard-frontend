import _ from "lodash";

export const fetchError = ({ error, defaultMsg = "Internal error" }) =>
  _.get(error, "response.data.description", defaultMsg);
