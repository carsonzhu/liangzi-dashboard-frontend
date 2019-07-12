import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";

export const inputGroup = ({
  label,
  type,
  value,
  name,
  disabled,
  labelClass
}) => {
  return (
    <Form.Group controlId={`form-${name}`}>
      <Form.Label className={labelClass}>{label}</Form.Label>
      <Form.Control type={type} value={value} name={name} disabled={disabled} />
    </Form.Group>
  );
};

export const optionGroup = ({
  label,
  type,
  value,
  name,
  disabled,
  labelClass,
  optionValues = [{ label: "", value: "", selected: false }]
}) => {
  return (
    <Form.Group controlId={`form-${name}`}>
      <Form.Label className={labelClass}>{label}</Form.Label>

      <Form.Control
        type={type}
        as="select"
        value={value}
        name={name}
        disabled={disabled}
      >
        {optionValues.map(value => {
          return (
            <option value={value.value} selected={value.selected}>
              {value.label}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export const radioButtonGroup = ({
  label,
  name,
  disabled,
  labelClass = "",
  checkGroupClass = "",
  radioValues = [{ label: "", name: "", id: "", checked: false }]
}) => {
  return (
    <Form.Group controlId={`form-${name}`}>
      <Form.Label className={labelClass}>{label}</Form.Label>

      <div className={checkGroupClass}>
        {radioValues.map(value => {
          return (
            <Form.Check
              type="radio"
              disabled={disabled}
              label={value.label}
              name={value.name}
              id={value.id}
              checked={value.checked}
            />
          );
        })}
      </div>
    </Form.Group>
  );
};
