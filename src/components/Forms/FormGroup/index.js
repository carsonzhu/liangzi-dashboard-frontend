import React from "react";
import { Form } from "react-bootstrap";

export const INPUT_TEXT = "INPUT_TEXT";
export const INPUT_DROPDOWN = "INPUT_DROPDOWN";
export const INPUT_CHECKBOX = "INPUT_CHECKBOX";

export const inputGroup = ({
  ind,
  label,
  type,
  value,
  name,
  disabled,
  labelClass,
  onChange,
  onBlur,
  error,
  placeholder = "",
  required = true
}) => {
  return (
    <div>
      <Form.Group key={ind} controlId={`form-${name}`}>
        <Form.Label className={labelClass}>{label}</Form.Label>
        <Form.Control
          type={type}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      </Form.Group>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export const optionGroup = ({
  ind,
  label,
  type,
  value,
  name,
  disabled,
  labelClass,
  error,
  optionValues = [{ label: "", value: "" }],
  onChange,
  onBlur,
  required = true
}) => {
  return (
    <div>
      <Form.Group key={ind} controlId={`form-${name}`}>
        <Form.Label className={labelClass}>{label}</Form.Label>

        <Form.Control
          type={type}
          as="select"
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        >
          {optionValues.map(option => {
            if (option.placeholder) {
              return (
                <option
                  value={option.value}
                  disabled={option.disabled}
                  selected={option.selected}
                >
                  {option.label}
                </option>
              );
            }

            return <option value={option.value}>{option.label}</option>;
          })}
        </Form.Control>
      </Form.Group>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export const radioButtonGroup = ({
  ind,
  label,
  name,
  disabled,
  labelClass = "",
  checkGroupClass = "",
  error,
  radioValues = [{ label: "", name: "", id: "", checked: false }],
  onChange,
  onBlur
}) => {
  return (
    <div>
      <Form.Group key={ind} controlId={`form-${name}`}>
        <Form.Label className={labelClass}>{label}</Form.Label>

        <div className={checkGroupClass}>
          {radioValues.map(value => {
            return (
              <Form.Check
                type="checkbox"
                disabled={disabled}
                label={value.label}
                name={value.name}
                id={value.id}
                defaultChecked={value.checked}
                onChange={onChange}
                onBlur={onBlur}
                checked={value.checked}
              />
            );
          })}
        </div>
      </Form.Group>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export const checkBoxHandler = function checkBoxHandler(
  formikProps,
  key,
  event
) {
  const removeItem = (array, item) => {
    const result = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== item) {
        result.push(array[i]);
      }
    }

    return result;
  };

  const value = event.target.checked;
  const fieldName = event.target.name;

  if (!value) {
    const operations = formikProps.values[key] || [];

    if (operations.includes(fieldName)) {
      formikProps.setFieldValue(key, removeItem(operations, fieldName), false);
    }
  } else {
    const operations = formikProps.values[key] || [];

    if (!operations.includes(fieldName)) {
      operations.push(fieldName);
      formikProps.setFieldValue(key, operations, false);
    }
  }
};

export const isActiveHandler = function isActiveHandler(
  formikProps,
  key,
  event
) {
  const value = event.target.value;

  formikProps.setFieldValue(key, value === "1", false);
};

export const selectionHandler = function selectionHandler(
  formikProps,
  key,
  event
) {
  const value = event.target.value;

  formikProps.setFieldValue(key, value, false);
};

const DEFAULT_LOCATION_HOURS = {
  mon: {},
  tue: {},
  wed: {},
  thur: {},
  fri: {},
  sat: {},
  sun: {}
};

export const locationHoursGroupHandler = function locationHoursGroupHandler(
  formikProps,
  key,
  event
) {
  const value = event.target.value;
  const fieldName = event.target.name;

  const [day, time] = fieldName.split("_");

  const hours = formikProps.values[key] || DEFAULT_LOCATION_HOURS;

  hours[day][time] = value;

  formikProps.setFieldValue(key, hours, false);
};

export const locationHoursGroup = ({
  ind,
  name,
  value = DEFAULT_LOCATION_HOURS,
  disabled,
  labelClass,
  onChange,
  onBlur,
  error,
  required = true
}) => {
  const getObjectValue = ({ value, keys }) => {
    const [day, time] = keys.split("_");

    return value[day][time];
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const keys = [
    "mon_open",
    "mon_close",
    "tue_open",
    "tue_close",
    "wed_open",
    "wed_close",
    "thur_open",
    "thur_close",
    "fri_open",
    "fri_close",
    "sat_open",
    "sat_close",
    "sun_open",
    "sun_close"
  ];

  const amOptionValues = [
    { label: "0 AM", value: "0am" },
    { label: "1 AM", value: "1am" },
    { label: "2 AM", value: "2am" },
    { label: "3 AM", value: "3am" },
    { label: "4 AM", value: "4am" },
    { label: "5 AM", value: "5am" },
    { label: "6 AM", value: "6am" },
    { label: "7 AM", value: "7am" },
    { label: "8 AM", value: "8am" },
    { label: "9 AM", value: "9am" },
    { label: "10 AM", value: "10am" },
    { label: "11 AM", value: "11am" }
  ];

  const pmOptionValues = [
    { label: "12 PM", value: "12pm" },
    { label: "1 PM", value: "1pm" },
    { label: "2 PM", value: "2pm" },
    { label: "3 PM", value: "3pm" },
    { label: "4 PM", value: "4pm" },
    { label: "5 PM", value: "5pm" },
    { label: "6 PM", value: "6pm" },
    { label: "7 PM", value: "7pm" },
    { label: "8 PM", value: "8pm" },
    { label: "9 PM", value: "9pm" },
    { label: "10 PM", value: "10pm" },
    { label: "11 PM", value: "11pm" }
  ];

  return (
    <div>
      <Form.Group key={ind} controlId={`form-${name}`}>
        <Form.Label className={labelClass}>{"Location Hours"}</Form.Label>

        <div>
          {days.map((day, ind) => {
            const openKey = keys[ind * 2];
            const closeKey = keys[ind * 2 + 1];

            return (
              <div
                key={ind}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <p
                  style={{
                    paddingRight: "1rem",
                    fontSize: "1.3rem",
                    width: "7rem"
                  }}
                >
                  {day}
                </p>
                <Form.Control
                  key={`${ind}-am`}
                  as="select"
                  value={getObjectValue({ keys: openKey, value })}
                  name={openKey}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  required={required}
                >
                  {amOptionValues.map((option, ind) => {
                    if (option.placeholder) {
                      return (
                        <option
                          key={ind}
                          value={option.value}
                          disabled={option.disabled}
                          selected={option.selected}
                        >
                          {option.label}
                        </option>
                      );
                    }

                    return <option value={option.value}>{option.label}</option>;
                  })}
                </Form.Control>
                <Form.Control
                  key={`${ind}-pm`}
                  as="select"
                  value={getObjectValue({ keys: closeKey, value })}
                  name={closeKey}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  required={required}
                >
                  {pmOptionValues.map((option, ind) => {
                    if (option.placeholder) {
                      return (
                        <option
                          key={ind}
                          value={option.value}
                          disabled={option.disabled}
                          selected={option.selected}
                        >
                          {option.label}
                        </option>
                      );
                    }

                    return <option value={option.value}>{option.label}</option>;
                  })}
                </Form.Control>
              </div>
            );
          })}
        </div>
      </Form.Group>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};
