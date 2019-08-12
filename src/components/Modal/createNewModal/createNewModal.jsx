import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./createNewModal.css";

import {
  inputGroup,
  radioButtonGroup,
  optionGroup,
  INPUT_TEXT,
  INPUT_CHECKBOX,
  INPUT_DROPDOWN,
  selectionHandler,
  checkBoxHandler,
  locationHoursGroup,
  locationHoursGroupHandler,
  imageInputGroup,
  imageInputHandler,
  ListInputGroup,
  listInputGroupHandler
} from "../../Forms/FormGroup";

class CreateNewModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    afterSubmitAction: PropTypes.func,
    inputs: PropTypes.array.isRequired,
    token: PropTypes.string
  };

  onSubmitHandler(values) {
    this.props.afterSubmitAction();

    this.props.handleSubmit({ ...values, token: this.props.token });
  }

  validationHelper(inputs) {
    return values => {
      const errors = {};

      for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i];
        const {
          key,
          required = true,
          customErrorValidation = false,
          customErrorMsg = ""
        } = field;

        // Custom error check
        if (customErrorValidation !== false) {
          if (customErrorValidation(values[key])) {
            errors[key] = customErrorMsg;
          }
        }

        // Required Check
        if (required && !values[key]) {
          errors[key] = "Required";
        }
      }

      return errors;
    };
  }

  formGenerator({
    props,
    inputs = [
      {
        key: "",
        inputType: "text", //html input type: email, password, date, etc
        label: "",
        disabled: false,
        inputOption: INPUT_TEXT,
        optionValues: [{ label: "", value: "" }], // optional (only for INPUT_DOWNDOWN)
        // optional (only for INPUT_CHECKBOX)
        radioValues: [
          {
            label: "",
            name: "",
            id: "",
            checked: true
          }
        ],
        placeholder: "" //optional for text
      }
    ]
  }) {
    return inputs.map(
      (
        {
          key,
          inputType,
          label,
          disabled,
          inputOption,
          optionValues,
          radioValues,
          placeholder
        },
        ind
      ) => {
        switch (inputOption) {
          case INPUT_TEXT: {
            return inputGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: props.values[key],
              name: key,
              disabled: disabled,
              labelClass: "modal__capitalized",
              onChange: props.handleChange,
              onBlur: props.handleBlur,
              placeholder: placeholder,
              error: props.errors[key]
            });
          }

          case INPUT_DROPDOWN: {
            return optionGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: props.values[key],
              name: key,
              disabled: disabled,
              labelClass: "modal__capitalized",
              optionValues: optionValues,
              onChange: selectionHandler.bind(this, props, key),
              onBlur: props.handleBlur,
              error: props.errors[key]
            });
          }

          case INPUT_CHECKBOX: {
            return radioButtonGroup({
              ind: ind,
              label: label,
              name: key,
              disabled: disabled,
              labelClass: "modal__capitalized",
              checkGroupClass: "modal__checkGroupClass",
              radioValues: radioValues,
              onChange: checkBoxHandler.bind(this, props, key),
              onBlur: props.handleBlur,
              error: props.errors[key]
            });
          }

          case "locationHours": {
            return locationHoursGroup({
              ind,
              name: key,
              value: props.values[key],
              disabled,
              labelClass: "modal__capitalized",
              onChange: locationHoursGroupHandler.bind(this, props, key),
              onBlur: props.handleBlur,
              error: props.errors[key],
              placeholder: true
            });
          }

          case "imageInput": {
            return imageInputGroup({
              ind: ind,
              label: label,
              value: props.values[key],
              name: key,
              disabled: disabled,
              labelClass: "modal__capitalized",
              onChange: imageInputHandler.bind(this, props, key),
              onBlur: props.handleBlur,
              placeholder: placeholder,
              error: props.errors[key]
            });
          }

          case "listInputGroup": {
            return (
              <ListInputGroup
                ind={ind}
                label={label}
                type={inputType}
                value={props.values[key]}
                name={key}
                disabled={disabled}
                labelClass={"modal__capitalized"}
                onChange={listInputGroupHandler.bind(this, props, key)}
                onBlur={props.handleBlur}
                placeholder={placeholder}
                error={props.errors[key]}
              />
            );
          }

          default:
            return inputGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: props.values[key],
              name: key,
              disabled: disabled,
              labelClass: "modal__capitalized",
              onChange: props.handleChange,
              onBlur: props.handleBlur,
              placeholder: placeholder,
              error: props.errors[key]
            });
        }
      }
    );
  }

  createForm({ handleClose, inputs }) {
    return (
      <div className="dataForm">
        <Formik
          onSubmit={(values, _) => {
            // TODO: values transform
            console.log("values", values);

            this.onSubmitHandler(values);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {this.formGenerator({ props, inputs })}
              <div className="dataForm__button-group">
                <Button variant="primary" onClick={props.handleSubmit}>
                  Submit
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </form>
          )}
          validate={this.validationHelper(inputs)}
        />
      </div>
    );
  }

  render() {
    const { toShow, handleClose, inputs } = this.props;

    return (
      <Modal
        className="createNewModal"
        show={toShow}
        size="lg"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.createForm({
            handleClose,
            inputs
          })}
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateNewModal;
