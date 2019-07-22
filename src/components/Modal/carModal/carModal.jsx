import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button, Col } from "react-bootstrap";
import "./carModal.css";

import {
  inputGroup,
  radioButtonGroup,
  optionGroup,
  checkBoxHandler,
  selectionHandler,
  locationHoursGroup,
  locationHoursGroupHandler
} from "../../Forms/FormGroup";

class CarModal extends Component {
  static propTypes = {
    toShow: PropTypes.bool,
    handleClose: PropTypes.func,
    handleEdit: PropTypes.func,
    data: PropTypes.object,
    afterSubmitAction: PropTypes.func,
    token: PropTypes.string,
    isSuper: PropTypes.bool,
    rentalCompanies: PropTypes.array
  };

  state = {
    beingEdited: false
  };

  toggleEditing = this.toggleEditing.bind(this);

  getRentalCompanyName({ rentalCompanyId }) {
    for (let i = 0; i < this.props.rentalCompanies.length; i++) {
      if (this.props.rentalCompanies[i]._id === rentalCompanyId) {
        return this.props.rentalCompanies[i].name;
      }
    }
  }

  toggleEditing() {
    this.setState(prevState => ({
      beingEdited: !prevState.beingEdited
    }));
  }

  formGenerator({ props, beingEdited }) {
    const inputTypeHelper = key => {
      switch (key) {
        case "dailyRateDisplay":
        case "dailyRate":
        case "trunkSize":
        case "seats":
          return "number";
        // TODO: vehicleImage
        // case "vehicleImage":
        //   return "file";
        default:
          return "text";
      }
    };

    const labelHelper = key => {
      switch (key) {
        case "_id":
          return "Vehicle Id";
        case "dailyRateDisplay":
          return "Daily Rate (Displayed)";
        case "dailyRate":
          return "Daily Rate";
        case "dailyRateUnit":
          return "Daily Rate Unit";
        case "locationAddress":
          return "Location Address";
        case "locationHours":
          return "Location Hourse";
        case "specialServices":
          return "Special Services";
        case "transmission":
          return "Transmission";
        case "vehicleType":
          return "Vehicle Type";
        case "trunkSize":
          return "Trunk Size";
        case "rentalCompanyId":
          return "Rental Company";
        case "vehicleMake":
          return "Vehicle Make";
        case "vehicleImage":
          return "Vehicle Image";
        case "vehilceNotes":
          return "Vehicle Notes";
        case "insuranceIds":
          return "Insurance";
        case "vehicleStatus":
          return "Status";
        default:
          return key;
      }
    };

    const disabledLogic = key => {
      return !(beingEdited && notEditabled.indexOf(key) === -1);
    };

    const inputOrders = [
      "vehicleImage",
      "_id",
      "rentalCompanyId",
      "dailyRateDisplay",
      "dailyRate",
      "dailyRateUnit",
      "locationAddress",
      "locationHours",
      "specialServices",
      "transmission",
      "vehicleType",
      "trunkSize",
      "seats",
      "vehicleMake",
      "vehicleNote",
      "insuranceIds",
      "vehicleStatus"
    ];
    const notEditabled = ["_id", "vehicleImage", "rentalCompanyId"];
    if (this.props.isSuper) {
      notEditabled.push("dailyRate");
    } else {
      notEditabled.push("dailyRateDisplay");
    }

    return inputOrders.map((key, ind) => {
      switch (key) {
        case "vehicleImage": {
          return (
            <div className="vehile-image">
              <img
                className="target-image"
                src={props.values[key]}
                alt="vehicle-image"
              />
            </div>
          );
        }

        case "rentalCompanyId": {
          return inputGroup({
            ind: ind,
            label: labelHelper(key),
            type: inputTypeHelper(key),
            value: this.getRentalCompanyName({
              rentalCompanyId: props.values[key]
            }),
            name: key,
            disabled: disabledLogic(key),
            labelClass: "modal__capitalized",
            onChange: props.handleChange,
            onBlur: props.handleBlur
          });
        }

        case "locationHours": {
          return locationHoursGroup({
            ind,
            name: key,
            value: props.values[key],
            disabled: disabledLogic(key),
            labelClass: "modal__capitalized",
            onChange: locationHoursGroupHandler.bind(this, props, key),
            onBlur: props.handleBlur
          });
        }

        case "transmission": {
          return optionGroup({
            ind: ind,
            label: labelHelper(key),
            type: inputTypeHelper(key),
            value: props.values[key],
            name: key,
            disabled: disabledLogic(key),
            labelClass: "modal__capitalized",
            optionValues: [
              { label: "Automatic", value: "auto" },
              { label: "Manual", value: "manual" }
            ],
            onChange: selectionHandler.bind(this, props, key),
            onBlur: props.handleBlur
          });
        }

        case "vehicleStatus": {
          return optionGroup({
            ind: ind,
            label: labelHelper(key),
            type: inputTypeHelper(key),
            value: props.values[key],
            name: key,
            disabled: disabledLogic(key),
            labelClass: "modal__capitalized",
            optionValues: [
              { label: "AVAILABLE", value: "AVAILABLE" },
              { label: "UNAVAILABLE", value: "UNAVAILABLE" },
              { label: "RENTED", value: "RENTED" }
            ],
            onChange: selectionHandler.bind(this, props, key),
            onBlur: props.handleBlur
          });
        }

        default:
          return inputGroup({
            ind: ind,
            label: labelHelper(key),
            type: inputTypeHelper(key),
            value: props.values[key] || "none",
            name: key,
            disabled: disabledLogic(key),
            labelClass: "modal__capitalized",
            onChange: props.handleChange,
            onBlur: props.handleBlur
          });
      }

      // if (key === "allowedOperations") {
      //   return radioButtonGroup({
      //     ind: ind,
      //     label: labelHelper(key),
      //     name: key,
      //     disabled: disabledLogic(key),
      //     labelClass: "modal__capitalized",
      //     checkGroupClass: "modal__checkGroupClass",
      //     radioValues: [
      //       {
      //         label: "Vehicle Operations",
      //         name: "cars",
      //         id: "allowed-operations__cars",
      //         checked: props.values[key].indexOf("cars") !== -1
      //       },
      //       {
      //         label: "User Operations",
      //         name: "users",
      //         id: "allowed-operations__users",
      //         checked: props.values[key].indexOf("users") !== -1
      //       },
      //       {
      //         label: "Insurance Operations",
      //         name: "insurances",
      //         id: "allowed-operations__insurances",
      //         checked: props.values[key].indexOf("insurances") !== -1
      //       },
      //       {
      //         label: "Transaction Operations",
      //         name: "transactions",
      //         id: "allowed-operations__transactions",
      //         checked: props.values[key].indexOf("transactions") !== -1
      //       }
      //     ],
      //     onChange: checkBoxHandler.bind(this, props, "allowedOperations"),
      //     onBlur: props.handleBlur
      //   });
      // } else if (key === "isActive") {
      //   return optionGroup({
      //     ind: ind,
      //     label: labelHelper(key),
      //     type: inputTypeHelper(key),
      //     value: props.values[key] ? "1" : "2",
      //     name: key,
      //     disabled: disabledLogic(key),
      //     labelClass: "modal__capitalized",
      //     optionValues: [
      //       { label: "Yes", value: "1" },
      //       { label: "No", value: "2" }
      //     ],
      //     onChange: selectionHandler.bind(this, props, "isActive"),
      //     onBlur: props.handleBlur
      //   });
      // } else if (key === "userType") {
      //   return optionGroup({
      //     ind: ind,
      //     label: labelHelper(key),
      //     type: inputTypeHelper(key),
      //     value:
      //       props.values[key] === "superAdmin" ? "superAdmin" : "normalAdmin",
      //     name: key,
      //     disabled: disabledLogic(key),
      //     labelClass: "modal__capitalized",
      //     optionValues: [
      //       { label: "Super Admin", value: "superAdmin" },
      //       { label: "Normal Admin", value: "normalAdmin" }
      //     ],
      //     onChange: selectionHandler.bind(this, props, "userType"),
      //     onBlur: props.handleBlur
      //   });
      // } else {
      //   return inputGroup({
      //     ind: ind,
      //     label: labelHelper(key),
      //     type: inputTypeHelper(key),
      //     value: key !== "password" ? props.values[key] : "12345678",
      //     name: key,
      //     disabled: disabledLogic(key),
      //     labelClass: "modal__capitalized",
      //     onChange: props.handleChange,
      //     onBlur: props.handleBlur
      //   });
      // }
    });
  }

  onSubmitHandler({ userId, fieldToUpdate }) {
    this.props.afterSubmitAction();

    this.props.handleEdit({ userId, fieldToUpdate, token: this.props.token });
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
            delete values.password;
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
      <Modal className="carModal" show={toShow} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.createForm({
            data,
            beingEdited: this.state.beingEdited,
            handleClose
          })}
          {/* {JSON.stringify(data)} */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default CarModal;
