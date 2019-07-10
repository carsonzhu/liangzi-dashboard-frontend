import React, from "react";
import { Table, Modal, Button } from "react-bootstrap";
import "./adminModal.css";

const adminModal = ({toShow, closeModalHandler, handleClose, handleEdit}) => {
  return (
    <Modal show={!!adminToShow} onHide={this.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{adminToShow.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{JSON.stringify(adminToShow)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={this.handleClose}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default adminModal
