import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

export const createNewFieldConfig = () => {
  return [
    {
      key: "name",
      inputType: "text",
      label: "Company Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "address",
      inputType: "text",
      label: "Company Address",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "locationAlias",
      inputType: "text",
      label: "Location Alias",
      disabled: false,
      required: false,
      inputOption: "listInputGroup",
      placeholder: "(OPTIONAL)"
    },
    {
      key: "companyRepName",
      inputType: "text",
      label: "Company Rep Name",
      disabled: false,
      inputOption: INPUT_TEXT,
      required: false,
      placeholder: "Company Representative (OPTIONAL)"
    },
    {
      key: "companyPhoneNumber",
      inputType: "tel",
      label: "Company Phone Number",
      disabled: false,
      inputOption: INPUT_TEXT,
      required: false,
      placeholder: "Company Phone Number (OPTIONAL)"
    }
    // {
    //   key: "rating",
    //   inputType: "number",
    //   label: "Company Rating",
    //   disabled: false,
    //   inputOption: INPUT_TEXT,
    //   required: false
    // },
    // {
    //   key: "perks",
    //   inputType: "text",
    //   label: "Perks",
    //   disabled: false,
    //   required: false,
    //   inputOption: INPUT_TEXT,
    //   placeholder: "(OPTIONAL)"
    // }
  ];
};

export const editFieldConfig = ({ values }) => {
  return [
    {
      key: "name",
      inputType: "text",
      value: values["name"],
      label: "Company Name",
      disabled: false,
      inputOption: INPUT_TEXT
    },
    {
      key: "address",
      inputType: "text",
      value: values["address"],
      label: "Company Address",
      disabled: false
    },
    // {
    //   key: "rating",
    //   inputType: "number",
    //   value: values["rating"],
    //   label: "Company Rating",
    //   disabled: false,
    //   inputOption: INPUT_TEXT,
    //   required: false
    // },
    // {
    //   key: "perks",
    //   inputType: "text",
    //   value: values["perks"],
    //   label: "Perks",
    //   disabled: false,
    //   required: false,
    //   inputOption: INPUT_TEXT
    // },
    {
      key: "locationAlias",
      inputType: "text",
      value: values["locationAlias"],
      label: "Location Alias",
      disabled: false,
      required: false,
      inputOption: "listInputGroup"
    },
    {
      key: "companyRepName",
      inputType: "text",
      value: values["companyRepName"],
      label: "Company Rep Name",
      disabled: false,
      inputOption: INPUT_TEXT,
      required: false
    },
    {
      key: "companyPhoneNumber",
      inputType: "tel",
      value: values["companyPhoneNumber"],
      label: "Company Phone Number",
      disabled: false,
      inputOption: INPUT_TEXT,
      required: false
    },
    {
      key: "rentalCompanyStatus",
      inputType: "text",
      value: values["rentalCompanyStatus"],
      label: "Active Company",
      disabled: false,
      inputOption: INPUT_DROPDOWN,
      optionValues: [
        { label: "Yes", value: "AVAILABLE" },
        { label: "No", value: "UNAVAILABLE" }
      ]
    }
  ];
};

const filterCompanies = ({ rentalCompanies = [{}], status }) => {
  return rentalCompanies.filter(
    rentalCompany => rentalCompany.rentalCompanyStatus === status
  );
};

export const rentalCompanyDropdownHelper = ({ rentalCompanies }) => {
  return filterCompanies({
    rentalCompanies,
    status: "AVAILABLE"
  }).map(rentalCompany => ({
    label: rentalCompany.name,
    value: rentalCompany._id
  }));
};
