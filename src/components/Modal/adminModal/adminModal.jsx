import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./adminModal.css";

import {
  inputGroup,
  radioButtonGroup,
  optionGroup
} from "../../Forms/FormGroup";

class AdminModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleEdit: PropTypes.func,
    data: PropTypes.object
  };

  state = {
    beingEdited: false
  };

  toggleEditing = this.toggleEditing.bind(this);

  toggleEditing() {
    this.setState(prevState => ({
      beingEdited: !prevState.beingEdited
    }));
  }

  formGenerator({ props, beingEdited }) {
    const inputTypeHelper = key => {
      switch (key) {
        case "email":
          return "email";
        case "password":
          return "password";
        default:
          return "text";
      }
    };

    const labelHelper = key => {
      switch (key) {
        case "_id":
          return "UserId";
        case "userType":
          return "User Type";
        case "allowedOperations":
          return "Allowed Operations";
        case "password":
          return "Password";
        case "isActive":
          return "Active Account";
        default:
          return key;
      }
    };

    const disabledLogic = key => {
      return !(beingEdited && notEditabled.indexOf(key) === -1);
    };

    const inputOrders = [
      "_id",
      "username",
      "email",
      "password",
      "userType",
      "allowedOperations",
      "isActive"
    ];
    const notEditabled = ["password", "_id"];

    return inputOrders.map(key => {
      if (key === "allowedOperations") {
        return radioButtonGroup({
          label: labelHelper(key),
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized",
          checkGroupClass: "modal__checkGroupClass",
          radioValues: [
            {
              label: "Vehicle Operations",
              name: "cars",
              id: "allowed-operations__cars",
              checked: props.values[key].indexOf("cars") !== -1
            },
            {
              label: "User Operations",
              name: "users",
              id: "allowed-operations__users",
              checked: props.values[key].indexOf("users") !== -1
            },
            {
              label: "Insurance Operations",
              name: "insurances",
              id: "allowed-operations__insurances",
              checked: props.values[key].indexOf("insurances") !== -1
            },
            {
              label: "Transaction Operations",
              name: "transactions",
              id: "allowed-operations__transactions",
              checked: props.values[key].indexOf("transactions") !== -1
            }
          ]
        });
      } else if (key === "isActive") {
        return optionGroup({
          label: labelHelper(key),
          type: inputTypeHelper(key),
          value: key !== "password" ? props.values[key] : "12345678",
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized",
          optionValues: [
            { label: "Yes", value: true, selected: props.values[key] },
            { label: "No", value: false, selected: !props.values[key] }
          ]
        });
      } else {
        return inputGroup({
          label: labelHelper(key),
          type: inputTypeHelper(key),
          value: key !== "password" ? props.values[key] : "12345678",
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized"
        });
      }
    });
  }

  createForm({ data, onSubmit, beingEdited, handleClose, handleEdit }) {
    return (
      <div className="dataForm">
        <Formik
          initialValues={data}
          onSubmit={(values, _) => {
            console.log("values", values);
            onSubmit(values);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {this.formGenerator({ props, data, beingEdited })}
              <div className="dataForm__button-group">
                {beingEdited ? (
                  <Button variant="primary" onClick={handleEdit}>
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
    const { toShow, handleClose, handleEdit, data } = this.props;

    return (
      <Modal
        className="adminModal"
        show={toShow}
        size="lg"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{data.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.createForm({
            data,
            onSubmit: handleEdit,
            beingEdited: this.state.beingEdited,
            handleClose,
            handleEdit
          })}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AdminModal;
