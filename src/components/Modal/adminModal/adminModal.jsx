import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./adminModal.css";

import {
  inputGroup,
  radioButtonGroup,
  optionGroup,
  checkBoxHandler,
  selectionHandler
} from "../../Forms/FormGroup";

class AdminModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleEdit: PropTypes.func,
    data: PropTypes.object,
    afterSubmitAction: PropTypes.func
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
    const notEditabled = ["password", "_id", "userType"];

    return inputOrders.map((key, ind) => {
      if (key === "allowedOperations") {
        return radioButtonGroup({
          ind: ind,
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
          ],
          onChange: checkBoxHandler.bind(this, props, "allowedOperations"),
          onBlur: props.handleBlur
        });
      } else if (key === "isActive") {
        return optionGroup({
          ind: ind,
          label: labelHelper(key),
          type: inputTypeHelper(key),
          value: props.values[key] ? "1" : "2",
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized",
          optionValues: [
            { label: "Yes", value: "1" },
            { label: "No", value: "2" }
          ],
          onChange: selectionHandler.bind(this, props, "isActive"),
          onBlur: props.handleBlur
        });
      } else if (key === "userType") {
        return optionGroup({
          ind: ind,
          label: labelHelper(key),
          type: inputTypeHelper(key),
          value:
            props.values[key] === "superAdmin" ? "superAdmin" : "normalAdmin",
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized",
          optionValues: [
            { label: "Super Admin", value: "superAdmin" },
            { label: "Normal Admin", value: "normalAdmin" }
          ],
          onChange: selectionHandler.bind(this, props, "userType"),
          onBlur: props.handleBlur
        });
      } else {
        return inputGroup({
          ind: ind,
          label: labelHelper(key),
          type: inputTypeHelper(key),
          value: key !== "password" ? props.values[key] : "12345678",
          name: key,
          disabled: disabledLogic(key),
          labelClass: "modal__capitalized",
          onChange: props.handleChange,
          onBlur: props.handleBlur
        });
      }
    });
  }

  onSubmitHandler({ userId, fieldToUpdate }) {
    this.props.afterSubmitAction();

    this.props.handleEdit({ userId, fieldToUpdate });
  }

  createForm({ data, beingEdited, handleClose }) {
    return (
      <div className="dataForm">
        <Formik
          initialValues={data}
          onSubmit={(values, _) => {
            const userId = values._id;
            const isActive = values.isActive;

            delete values._id;
            delete values.passowrd;
            values.isActive = isActive === "1";

            this.onSubmitHandler({ userId, fieldToUpdate: values });
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {this.formGenerator({ props, data, beingEdited })}
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
    const { toShow, handleClose, data } = this.props;

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
            beingEdited: this.state.beingEdited,
            handleClose
          })}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AdminModal;
