import {
  INPUT_CHECKBOX,
  INPUT_TEXT,
  INPUT_DROPDOWN
} from "../../components/Forms/FormGroup";

import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";

export const header = userType => [
  { title: "Rental Company", key: "rentalCompanyId" },
  { title: "Location Address", key: "locationAddress" },
  { title: "Vehicle Type", key: "vehicleType" },
  { title: "Vehicle Make", key: "vehicleMake" },
  {
    title: "Daily Rate",
    key: userType === "superAdmin" ? "dailyRateDisplay" : "dailyRate"
  },
  { title: "Action", key: "action" }
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

const MULTER_FILESIZE_LIMIT = 1000000;

export const createNewFieldConfig = ({ rentalCompanies, insurances }) => {
  const PLACEHOLDER = label => ({
    label: label,
    value: "",
    placeholder: true
  });

  const rentalCompanyDropdown = rentalCompanyDropdownHelper({
    rentalCompanies
  });

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
      inputOption: "locationHours",
      customErrorValidation: value => {
        if (!value) {
          return false;
        }

        const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

        for (let i = 0; i < days.length; i++) {
          const day = days[i];

          if (
            !(day in value && "open" in value[day] && "close" in value[day])
          ) {
            return true;
          }
        }
        return false;
      },
      customErrorMsg: "Please fill out the open and close time from Mon - Sun"
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
      name: "vehicleImage",
      label: "Vehicle Image",
      disabled: false,
      inputOption: "imageInput",
      customErrorValidation: value => {
        if (!value) {
          return false;
        }

        if (value.size > MULTER_FILESIZE_LIMIT) {
          return true;
        }
        return false;
      },
      customErrorMsg: "Image oversize"
    },
    {
      key: "vehicleNotes",
      inputType: "text",
      label: "Vehicle Notes",
      disabled: false,
      inputOption: INPUT_TEXT
    },
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
      inputOption: "listInputGroup",
      required: false,
      placeholder: "(OPTIONAL)"
    }
  ];
};

export const editFieldConfig = ({ rentalCompanies, insurances, userType }) => ({
  values
}) => {
  const rentalCompanyDropdown = rentalCompanyDropdownHelper({
    rentalCompanies
  });

  const insuranceCheckBoxes = insurances.map(insurance => ({
    label: `${insurance.name} from ${insurance.rentalCompanyName}`,
    name: insurance._id,
    id: "insurances",
    checked: values["insuranceIds"].includes(insurance._id)
  }));

  if (userType === "superAdmin") {
    return [
      {
        key: "vehicleImage",
        value: values["vehicleImage"],
        containerClassName: "vehile-image",
        imgClassName: "target-image",
        inputOption: "image",
        disabled: false,
        label: "Vehicle Image",
        customErrorValidation: value => {
          if (!value) {
            return false;
          }

          if (value.size > MULTER_FILESIZE_LIMIT) {
            return true;
          }
          return false;
        },
        customErrorMsg: "Image oversize"
      },
      {
        key: "dailyRateDisplay",
        inputType: "number",
        value: values["dailyRateDisplay"],
        label: "Daily Rate (Portal)",
        disabled: userType !== "superAdmin",
        inputOption: INPUT_TEXT
      },
      {
        key: "dailyRate",
        inputType: "number",
        value: values["dailyRate"],
        label: "Daily Rate (Company)",
        disabled: userType === "superAdmin",
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
      },
      {
        key: "rentalCompanyId",
        inputType: "text",
        value: values["rentalCompanyId"],
        label: "Rental Company Id",
        disabled: false,
        inputOption: INPUT_DROPDOWN,
        optionValues: [...rentalCompanyDropdown]
      },
      {
        key: "locationAddress",
        inputType: "text",
        value: values["locationAddress"],
        label: "Location Address",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "locationHours",
        inputType: "text",
        value: values["locationHours"],
        label: "Location Hours",
        disabled: false,
        inputOption: "locationHours"
      },
      {
        key: "transmission",
        inputType: "text",
        value: values["transmission"],
        label: "Transmission",
        disabled: false,
        inputOption: INPUT_DROPDOWN,
        optionValues: [
          { label: "Automatic", value: "auto" },
          { label: "Manual", value: "manual" }
        ]
      },
      {
        key: "vehicleType",
        inputType: "text",
        value: values["vehicleType"],
        label: "Vehicle Type",
        disabled: false,
        inputOption: INPUT_TEXT,
        placeholder: "Ex. SUV"
      },
      {
        key: "trunkSize",
        inputType: "number",
        value: values["trunkSize"],
        label: "Trunk Size",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "seats",
        inputType: "number",
        value: values["seats"],
        label: "seats",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "vehicleMake",
        inputType: "text",
        value: values["vehicleMake"],
        label: "Vehicle Make",
        disabled: false,
        inputOption: INPUT_TEXT,
        placeholder: "Ex. Toyota"
      },
      {
        key: "vehicleNotes",
        inputType: "text",
        value: values["vehicleNotes"],
        label: "Vehicle Notes",
        disabled: false,
        inputOption: INPUT_TEXT
      },
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
        value: values["specialServices"],
        label: "Special Services",
        disabled: false,
        inputOption: "listInputGroup",
        required: false,
        placeholder: "(OPTIONAL)"
      }
      // {
      //   key: "vehicleStatus",
      //   inputType: "text",
      //   value: values["vehicleStatus"],
      //   label: "Vehicle Status",
      //   disabled: false,
      //   inputOption: INPUT_DROPDOWN,
      //   optionValues: [
      //     { label: "AVAILABLE", value: "AVAILABLE" },
      //     { label: "UNAVAILABLE", value: "UNAVAILABLE" },
      //     { label: "RENTED", value: "RENTED" }
      //   ]
      // }
    ];
  } else {
    return [
      {
        key: "vehicleImage",
        value: values["vehicleImage"],
        containerClassName: "vehile-image",
        imgClassName: "target-image",
        inputOption: "image",
        disabled: false,
        label: "Vehicle Image",
        customErrorValidation: value => {
          if (!value) {
            return false;
          }

          if (value.size > MULTER_FILESIZE_LIMIT) {
            return true;
          }
          return false;
        },
        customErrorMsg: "Image oversize"
      },
      {
        key: "dailyRate",
        inputType: "number",
        value: values["dailyRate"],
        label: "Daily Rate (Company)",
        disabled: userType === "superAdmin",
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
      },
      {
        key: "rentalCompanyId",
        inputType: "text",
        value: values["rentalCompanyId"],
        label: "Rental Company Id",
        disabled: false,
        inputOption: INPUT_DROPDOWN,
        optionValues: [...rentalCompanyDropdown]
      },
      {
        key: "locationAddress",
        inputType: "text",
        value: values["locationAddress"],
        label: "Location Address",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "locationHours",
        inputType: "text",
        value: values["locationHours"],
        label: "Location Hours",
        disabled: false,
        inputOption: "locationHours"
      },
      {
        key: "transmission",
        inputType: "text",
        value: values["transmission"],
        label: "Transmission",
        disabled: false,
        inputOption: INPUT_DROPDOWN,
        optionValues: [
          { label: "Automatic", value: "auto" },
          { label: "Manual", value: "manual" }
        ]
      },
      {
        key: "vehicleType",
        inputType: "text",
        value: values["vehicleType"],
        label: "Vehicle Type",
        disabled: false,
        inputOption: INPUT_TEXT,
        placeholder: "Ex. SUV"
      },
      {
        key: "trunkSize",
        inputType: "number",
        value: values["trunkSize"],
        label: "Trunk Size",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "seats",
        inputType: "number",
        value: values["seats"],
        label: "seats",
        disabled: false,
        inputOption: INPUT_TEXT
      },
      {
        key: "vehicleMake",
        inputType: "text",
        value: values["vehicleMake"],
        label: "Vehicle Make",
        disabled: false,
        inputOption: INPUT_TEXT,
        placeholder: "Ex. Toyota"
      },
      {
        key: "vehicleNotes",
        inputType: "text",
        value: values["vehicleNotes"],
        label: "Vehicle Notes",
        disabled: false,
        inputOption: INPUT_TEXT
      },
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
        value: values["specialServices"],
        label: "Special Services",
        disabled: false,
        inputOption: "listInputGroup",
        required: false,
        placeholder: "(OPTIONAL)"
      }
      // {
      //   key: "vehicleStatus",
      //   inputType: "text",
      //   value: values["vehicleStatus"],
      //   label: "Vehicle Status",
      //   disabled: false,
      //   inputOption: INPUT_DROPDOWN,
      //   optionValues: [
      //     { label: "AVAILABLE", value: "AVAILABLE" },
      //     { label: "UNAVAILABLE", value: "UNAVAILABLE" },
      //     { label: "RENTED", value: "RENTED" }
      //   ]
      // }
    ];
  }
};
