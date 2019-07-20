import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

export const header = [
  { title: "Rental Company", key: "rentalCompanyId" },
  { title: "Location Address", key: "locationAddress" },
  { title: "Vehicle Type", key: "vehicleType" },
  { title: "Vehicle Make", key: "vehicleMake" },
  { title: "Daily Rate", key: "dailyRateDisplay" }
];

export const getRentalCompanyName = ({ rentalCompanyId, rentalCompanies }) => {
  let rentalCompanyName = "";

  rentalCompanies.forEach(rentalCompany => {
    if (rentalCompany._id === rentalCompanyId) {
      rentalCompanyName = rentalCompany.name;
    }
  });

  return rentalCompanyName;
};

export const createNewFieldConfig = [
  {
    key: "dailyRate",
    inputType: "number",
    label: "Daily Rate",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO: dropdown CAD, USD?
  {
    key: "dailyRateUnit",
    inputType: "text",
    label: "Daily Rate Unit",
    disabled: false,
    inputOption: INPUT_DROPDOWN,
    optionValues: [
      { label: "Select unit type", value: "", placeholder: true },
      { label: "CAD", value: "CAD" },
      { label: "USD", value: "USD" }
    ]
  },
  {
    key: "locationAddress",
    inputType: "text",
    label: "Location Address",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO
  {
    key: "locationHours",
    inputType: "text",
    label: "Location Hours",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO: special services
  {
    key: "transmission",
    inputType: "text",
    label: "Transmission",
    disabled: false,
    inputOption: INPUT_DROPDOWN,
    optionValues: [
      { label: "Select transmission type", value: "", placeholder: true },
      { label: "Automatic", value: "auto" },
      { label: "Manual", value: "manual" }
    ]
  },
  {
    key: "vehicleType",
    inputType: "text",
    label: "Vehicle Type",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  {
    key: "trunkSize",
    inputType: "number",
    label: "Trunk Size",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  {
    key: "seats",
    inputType: "number",
    label: "seats",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO: dropdown
  {
    key: "rentalCompanyId",
    inputType: "text",
    label: "Rental Company Id",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  {
    key: "vehicleMake",
    inputType: "text",
    label: "Vehicle Make",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  {
    key: "vehicleImage",
    inputType: "text",
    label: "Vehicle Image",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO
  {
    key: "vehicleNotes",
    inputType: "text",
    label: "Vehicle Notes",
    disabled: false,
    inputOption: INPUT_TEXT
  },
  // TODO
  {
    key: "insuranceIds",
    inputType: "text",
    label: "Insurance Ids",
    disabled: false,
    inputOption: INPUT_TEXT
  }
];
