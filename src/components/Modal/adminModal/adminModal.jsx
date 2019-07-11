import React from "react";
import { Table, Modal, Button } from "react-bootstrap";
import "./adminModal.css";

const adminModal = ({ toShow, handleClose, handleEdit, data }) => {
  return (
    <Modal show={toShow} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{JSON.stringify(data)}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="secondary" onClick={this.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default adminModal;
