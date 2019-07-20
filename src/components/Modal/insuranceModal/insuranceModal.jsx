import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./insuranceModal.css";

import {
  inputGroup,
  radioButtonGroup,
  optionGroup,
  checkBoxHandler,
  selectionHandler
} from "../../Forms/FormGroup";

class InsuranceModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    data: PropTypes.object,
    afterSubmitAction: PropTypes.func,
    token: PropTypes.string
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
        case "dailyRate":
          return "number";
        default:
          return "text";
      }
    };

    const labelHelper = key => {
      switch (key) {
        case "rentalCompanyId":
          return "Rental Company ID";
        case "rentalCompanyName":
          return "Rental Company Name";
        case "name":
          return "Name";
        case "description":
          return "Description";
        case "dailyRate":
          return "Daily Rate";
        case "dailyRateUnit":
          return "Daily Rate Unit";
        default:
          return key;
      }
    };

    const disabledLogic = key => {
      return !(beingEdited && notEditabled.indexOf(key) === -1);
    };

    const inputOrders = [
      "rentalCompanyId",
      "rentalCompanyName",
      "name",
      "description",
      "dailyRate",
      "dailyRateUnit"
    ];
    const notEditabled = [];

    return inputOrders.map((key, ind) => {
      return inputGroup({
        ind: ind,
        label: labelHelper(key),
        type: inputTypeHelper(key),
        value: props.values[key],
        name: key,
        disabled: disabledLogic(key),
        labelClass: "modal__capitalized",
        onChange: props.handleChange,
        onBlur: props.handleBlur
      });
    });
  }

  onSubmitHandler({ insuranceId, fieldToUpdate }) {
    this.props.afterSubmitAction();

    this.props.handleEdit({
      insuranceId,
      fieldToUpdate,
      token: this.props.token
    });
  }

  onDeletehandler({ insuranceId }) {
    this.props.afterSubmitAction();

    this.props.handleDelete({
      insuranceId,
      token: this.props.token
    });
  }

  createForm({ data, beingEdited, handleClose }) {
    const insuranceId = data._id;
    const handleDelete = () => {
      this.onDeletehandler({
        insuranceId
      });
    };
    return (
      <div className="dataForm">
        <Formik
          initialValues={data}
          onSubmit={(values, _) => {
            delete values._id;
            delete values.__v;
            this.onSubmitHandler({
              insuranceId,
              fieldToUpdate: values
            });
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
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
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
        className="insuranceModal"
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

export default InsuranceModal;
