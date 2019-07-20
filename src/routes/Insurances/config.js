import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

export const createNewFieldConfig = [
  {
    key: "rentalCompanyId",
    inputType: "text",
    label: "Rental Company ID",
    disabled: false,
    inputOption: INPUT_TEXT
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
    label: "Name",
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
    inputOption: INPUT_TEXT
  }
];
