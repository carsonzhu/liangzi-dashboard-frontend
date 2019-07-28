import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

export const createNewFieldConfig = ({ rentalCompanies }) => {
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

export const editFieldConfig = ({ values, rentalCompanies }) => {
  const rentalCompanyDropdown = rentalCompanies.map(rentalCompany => ({
    label: rentalCompany.name,
    value: rentalCompany._id
  }));

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
      inputOption: INPUT_TEXT
    },
    {
      key: "userType",
      inputType: "text",
      value: values["userType"],
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
