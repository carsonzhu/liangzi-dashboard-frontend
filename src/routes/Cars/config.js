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

export const createNewFieldConfig = ({ rentalCompanies, insurances }) => {
  const PLACEHOLDER = label => ({
    label: label,
    value: "",
    placeholder: true
  });

  const rentalCompanyDropdown = rentalCompanies.map(rentalCompany => ({
    label: rentalCompany.name,
    value: rentalCompany._id
  }));

  const insuranceCheckBoxes = insurances.map(insurance => ({
    label: `${insurance.name} from ${insurance.rentalCompanyName}`,
    name: insurance._id,
    id: "insurances"
  }));

  return [
    {
      key: "dailyRate",
      inputType: "number",
      label: "Daily Rate",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "dailyRateUnit",
      inputType: "text",
      label: "Daily Rate Unit",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        PLACEHOLDER("Select unit type"),
        { label: "CAD", value: "CAD" },
        { label: "USD", value: "USD" },
        { label: "RMB", value: "RMB" }
      ]
    },
    {
      key: "rentalCompanyId",
      inputType: "text",
      label: "Rental Company Id",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        PLACEHOLDER("Select Rental Company"),
        ...rentalCompanyDropdown
      ]
    },
    {
      key: "locationAddress",
      inputType: "text",
      label: "Location Address",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "locationHours",
      inputType: "text",
      label: "Location Hours",
      disabled: false,
      inputOption: "locationHours"
    },
    {
      key: "transmission",
      inputType: "text",
      label: "Transmission",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        PLACEHOLDER("Select transmission type"),
        { label: "Automatic", value: "auto" },
        { label: "Manual", value: "manual" }
      ]
    },
    {
      key: "vehicleType",
      inputType: "text",
      label: "Vehicle Type",
      disabled: false,
      inputOption: INPUT_TEXT,
      placeholder: "Ex. SUV"
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
    {
      key: "vehicleMake",
      inputType: "text",
      label: "Vehicle Make",
      disabled: false,
      inputOption: INPUT_TEXT,
      placeholder: "Ex. Toyota"
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
      inputOption: INPUT_CHECKBOX,
      radioValues: insuranceCheckBoxes
    },
    {
      key: "specialServices",
      inputType: "text",
      label: "Special Services",
      disabled: false,
      inputOption: INPUT_TEXT,
      required: false,
      placeholder: "(OPTIONAL)"
    }
  ];
};
