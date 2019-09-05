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
