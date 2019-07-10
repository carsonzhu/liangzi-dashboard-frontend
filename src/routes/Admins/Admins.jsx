import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
import "./Admins.css";

import ActivityIndicator from "../../utilities/activity-indicator";

import { FETCHING } from "../../reducers/admins";

const mapStateToProps = state => ({
  isLoading: state.admins.loading,
  admins: state.admins.admins
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: () => dispatch({ type: FETCHING })
});

class Admins extends Component {
  static propTypes = {
    fetchAdmins: PropTypes.func,
    isLoading: PropTypes.bool,
    admins: PropTypes.array
  };

  static defaultProps = {
    admins: [],
    isLoading: false,
    fetchAdmins: () => {}
  };

  state = {
    adminToShow: null,
    adminToEdit: null
  };

  // openModel = this.openModel.bind(this, data);
  closeModal = this.closeModal.bind(this);

  tbodyGenerator({ admins }) {
    console.log("admins", admins);

    return admins.map((info, ind) => (
      <tr
        key={ind}
        className={
          info.isActive ? "admins__column-active" : "admins__column-inactive"
        }
        onClick={this.openModel.bind(this, info)}
      >
        <td>{ind}</td>
        <td>{info.userType}</td>
        <td>{info.email}</td>
        <td>{info.username}</td>
      </tr>
    ));
  }

  theadGenerater({ fields }) {
    console.log("fields", fields);

    return (
      <tr>
        <th>#</th>
        <th>User Type</th>
        <th>Email</th>
        <th>Username</th>
      </tr>
    );
  }

  componentDidMount() {
    this.props.fetchAdmins();
  }

  componentDidUpdate(prevProps) {}

  openModel(data) {
    this.setState({ adminToShow: data });
  }

  closeModal() {
    this.setState({ adminToShow: null });
  }

  render() {
    console.log("this.props.admins", this.props.admins);

    const { adminToShow = {} } = this.state;

    return (
      <div className="admins-route">
        <div>Admins</div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.admins && this.props.admins.length && (
            <Table responsive hover>
              <thead>
                {this.theadGenerater({
                  fields: Object.keys(this.props.admins[0])
                })}
              </thead>

              <tbody>
                {this.tbodyGenerator({ admins: this.props.admins })}
              </tbody>
            </Table>
          )}
        </ActivityIndicator>

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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins);
