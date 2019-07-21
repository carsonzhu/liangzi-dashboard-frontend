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
  placeholder = "",
  required = true
}) => {
  return (
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
  optionValues = [{ label: "", value: "" }],
  onChange,
  onBlur,
  required = true
}) => {
  return (
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
  );
};

export const radioButtonGroup = ({
  ind,
  label,
  name,
  disabled,
  labelClass = "",
  checkGroupClass = "",
  radioValues = [{ label: "", name: "", id: "", checked: false }],
  onChange,
  onBlur
}) => {
  return (
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
            />
          );
        })}
      </div>
    </Form.Group>
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

export const selectionHandler = function selectionHandler(
  formikProps,
  key,
  event
) {
  const value = event.target.value;

  formikProps.setFieldValue(key, value, false);
};
