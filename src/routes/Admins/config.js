import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";

export const createNewFieldConfig = ({ rentalCompanies }) => {
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
      key: "username",
      inputType: "text",
      label: "User Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "email",
      inputType: "email",
      label: "Email",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "password",
      inputType: "password",
      label: "Password",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "userType",
      inputType: "text",
      label: "User Type",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        PLACEHOLDER("Select user type"),
        { label: "Super Admin", value: "superAdmin" },
        { label: "Noraml Admin", value: "normalAdmin" }
      ]
    },
    {
      key: "allowedOperations",
      inputType: "text",
      label: "Allowed Operations",
      disabled: false,
      inputOption: INPUT_CHECKBOX,
      radioValues: [
        {
          label: "Vehicle Operations",
          name: "cars",
          id: "allowed-operations__cars"
        },
        // {
        //   label: "User Operations",
        //   name: "users",
        //   id: "allowed-operations__users"
        // },
        {
          label: "Insurance Operations",
          name: "insurances",
          id: "allowed-operations__insurances"
        }
        // {
        //   label: "Transaction Operations",
        //   name: "transactions",
        //   id: "allowed-operations__transactions"
        // }
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
    }
  ];
};

export const editFieldConfig = ({ rentalCompanies }) => ({ values }) => {
  const rentalCompanyDropdown = rentalCompanyDropdownHelper({
    rentalCompanies
  });

  const operationRadioBoxes = [
    {
      label: "Vehicle Operations",
      name: "cars",
      id: "allowed-operations__cars",
      checked: values["allowedOperations"].includes("cars")
    },
    // {
    //   label: "User Operations",
    //   name: "users",
    //   id: "allowed-operations__users"
    // },
    {
      label: "Insurance Operations",
      name: "insurances",
      id: "allowed-operations__insurances",
      checked: values["allowedOperations"].includes("insurances")
    }
    // {
    //   label: "Transaction Operations",
    //   name: "transactions",
    //   id: "allowed-operations__transactions"
    // }
  ];

  return [
    {
      key: "_id",
      inputType: "text",
      value: values["_id"],
      label: "UserId",
      disabled: true,
      inputOption: INPUT_TEXT
    },
    {
      key: "username",
      inputType: "text",
      value: values["username"],
      label: "User Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "email",
      inputType: "email",
      value: values["email"],
      label: "Email",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "password",
      inputType: "password",
      value: "12345678",
      label: "Password",
      disabled: true,
      inputOption: INPUT_TEXT,
      required: false
    },
    {
      key: "userType",
      inputType: "text",
      value: values["userType"] === "superAdmin" ? "superAdmin" : "normalAdmin",
      label: "User Type",
      disabled: true,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        { label: "Super Admin", value: "superAdmin" },
        { label: "Noraml Admin", value: "normalAdmin" }
      ]
    },
    {
      key: "allowedOperations",
      inputType: "text",
      label: "Allowed Operations",
      disabled: false,
      inputOption: INPUT_CHECKBOX,
      radioValues: operationRadioBoxes
    },
    {
      key: "isActive",
      inputType: "text",
      value: values["isActive"] ? "1" : "2",
      label: "Active Account",
      disabled: false,
      inputOption: "bool",
      optionValues: [{ label: "Yes", value: "1" }, { label: "No", value: "2" }]
    },
    {
      key: "rentalCompanyId",
      inputType: "text",
      value: values["rentalCompanyId"],
      label: "Rental Company Id",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [...rentalCompanyDropdown]
    }
  ];
};
