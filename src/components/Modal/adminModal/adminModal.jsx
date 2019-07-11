import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Alert, Form, Modal, Button } from "react-bootstrap";
import "./adminModal.css";

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

  formGenerator({ props, data, beingEdited }) {
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
          return "UserId (not editabled)";
        case "userType":
          return "User Type";
        case "allowedOperations":
          return "Allowed Operations";
        case "password":
          return "Password (not editabled)";
        default:
          return key;
      }
    };

    const inputOrders = [
      "_id",
      "username",
      "email",
      "password",
      "userType",
      "allowedOperations"
    ];
    const notEditabled = ["password", "_id"];

    return inputOrders.map(key => (
      <Form.Group controlId={`form-${key}`}>
        <Form.Label className="modal__capitalized">
          {labelHelper(key)}
        </Form.Label>
        <Form.Control
          type={inputTypeHelper(key)}
          value={key !== "password" ? props.values[key] : "12345678"}
          name={key}
          disabled={!beingEdited || notEditabled.indexOf(key) === -1}
        />
      </Form.Group>
    ));
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
      <div className="adminModal">
        <Modal show={toShow} size="lg" onHide={handleClose}>
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
      </div>
    );
  }
}

export default AdminModal;
