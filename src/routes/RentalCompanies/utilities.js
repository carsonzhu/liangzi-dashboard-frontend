export const formatPhoneNumber = phoneNumberString => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
};

export const applyFilter = ({ insurance, states = {} }) => {
  const { filterRentalCompanyId } = states;

  if (
    filterRentalCompanyId &&
    filterRentalCompanyId !== "All" &&
    insurance.rentalCompanyId !== filterRentalCompanyId
  ) {
    return false;
  }

  return true;
};
