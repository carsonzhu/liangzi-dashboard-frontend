import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

export const createNewFieldConfig = rentalCompanies => {
  const PLACEHOLDER = label => ({
    label: label,
    value: "",
    placeholder: true
  });

  const rentalCompanyDropdown = rentalCompanies.map(rentalCompany => ({
    label: rentalCompany.name,
    value: rentalCompany._id
  }));

  return [
    {
      key: "rentalCompanyId",
      inputType: "text",
      label: "Rental Company ID",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        PLACEHOLDER("Select Rental Company"),
        ...rentalCompanyDropdown
      ]
    },
    {
      key: "rentalCompanyName",
      inputType: "text",
      label: "Rental Company Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "name",
      inputType: "text",
      label: "Insurance Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "description",
      inputType: "text",
      label: "Description",
      disabled: false,
      inputOption: INPUT_TEXT
    },
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
    }
  ];
};
