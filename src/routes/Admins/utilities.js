export const applyFilter = ({ admin, states = {} }) => {
  const { filterRentalCompanyId } = states;

  if (
    filterRentalCompanyId &&
    filterRentalCompanyId !== "All" &&
    admin.rentalCompanyId !== filterRentalCompanyId
  ) {
    return false;
  }

  return true;
};
