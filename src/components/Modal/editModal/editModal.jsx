import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./editModal.css";

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
  booleanDropdownHandler
} from "../../Forms/FormGroup";

class EditModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    afterSubmitAction: PropTypes.func,
    inputs: PropTypes.array.isRequired,
    token: PropTypes.string,
    formValuesTransformer: PropTypes.func.isRequired
  };

  state = {
    beingEdited: false
  };

  toggleEditing = this.toggleEditing.bind(this);

  onSubmitHandler(values) {
    this.props.afterSubmitAction();

    this.props.handleSubmit({
      ...values,
      token: this.props.token
    });
  }

  toggleEditing() {
    this.setState(prevState => ({
      beingEdited: !prevState.beingEdited
    }));
  }

  formGenerator({
    props,
    beingEdited,
    inputs = () => ({
      key: "",
      inputType: "text", //html input type: email, password, date, etc
      value: "",
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
    })
  }) {
    const disabledLogic = disabled => !beingEdited || disabled;

    return inputs({ values: props.values }).map(
      (
        {
          key,
          inputType,
          value,
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
              value: value,
              name: key,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              onChange: props.handleChange,
              onBlur: props.handleBlur,
              placeholder: placeholder
            });
          }

          case INPUT_DROPDOWN: {
            return optionGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: value,
              name: key,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              optionValues: optionValues,
              onChange: selectionHandler.bind(this, props, key),
              onBlur: props.handleBlur
            });
          }

          case INPUT_CHECKBOX: {
            return radioButtonGroup({
              ind: ind,
              label: label,
              name: key,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              checkGroupClass: "modal__checkGroupClass",
              radioValues: radioValues,
              onChange: checkBoxHandler.bind(this, props, key),
              onBlur: props.handleBlur
            });
          }

          case "locationHours": {
            return locationHoursGroup({
              ind,
              name: key,
              value: value,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              onChange: locationHoursGroupHandler.bind(this, props, key),
              onBlur: props.handleBlur
            });
          }

          case "bool": {
            return optionGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: value,
              name: key,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              optionValues: optionValues,
              onChange: booleanDropdownHandler.bind(this, props, key),
              onBlur: props.handleBlur
            });
          }

          default:
            return inputGroup({
              ind: ind,
              label: label,
              type: inputType,
              value: value,
              name: key,
              disabled: disabledLogic(disabled),
              labelClass: "modal__capitalized",
              onChange: props.handleChange,
              onBlur: props.handleBlur,
              placeholder: placeholder
            });
        }
      }
    );
  }

  createForm({ data, handleClose, beingEdited, inputs }) {
    return (
      <div className="dataForm">
        <Formik
          initialValues={data}
          onSubmit={(values, _) => {
            // TODO: values transform
            console.log("values", values);

            this.onSubmitHandler(this.props.formValuesTransformer(values));
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {this.formGenerator({ props, inputs, beingEdited })}
              <div className="dataForm__button-group">
                {beingEdited ? (
                  <Button variant="primary" onClick={props.handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button variant="primary" onClick={this.toggleEditing}>
                    Edit
                  </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }

  render() {
    const {
      toShow,
      handleClose,
      inputs,
      modalName = "Edit",
      data
    } = this.props;

    return (
      <Modal className="editModal" show={toShow} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.createForm({
            data,
            handleClose,
            beingEdited: this.state.beingEdited,
            inputs
          })}
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditModal;
