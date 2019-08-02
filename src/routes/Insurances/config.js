import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";

export const createNewFieldConfig = rentalCompanies => {
  const PLACEHOLDER = label => ({
    label: label,
    value: "",
    placeholder: true
  });

  const rentalCompanyDropdown = rentalCompanyDropdownHelper({
    rentalCompanies
  });

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

export const editFieldConfig = ({ rentalCompanies }) => ({ values }) => {
  const rentalCompanyDropdown = rentalCompanyDropdownHelper({
    rentalCompanies
  });

  return [
    {
      key: "rentalCompanyId",
      inputType: "text",
      label: "Rental Company ID",
      value: values["rentalCompanyId"],
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [...rentalCompanyDropdown]
    },
    {
      key: "rentalCompanyName",
      inputType: "text",
      value: values["rentalCompanyName"],
      label: "Rental Company Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "name",
      inputType: "text",
      value: values["name"],
      label: "Insurance Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "description",
      inputType: "text",
      value: values["description"],
      label: "Description",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "dailyRate",
      inputType: "number",
      value: values["dailyRate"],
      label: "Daily Rate",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "dailyRateUnit",
      inputType: "text",
      value: values["dailyRateUnit"],
      label: "Daily Rate Unit",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        { label: "CAD", value: "CAD" },
        { label: "USD", value: "USD" },
        { label: "RMB", value: "RMB" }
      ]
    }
  ];
};
