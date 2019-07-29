import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Toast, Button } from "react-bootstrap";
import "./RentalCompanies.css";

import ActivityIndicator from "../../utilities/activity-indicator";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import { createNewFieldConfig, editFieldConfig } from "./config";

import { FETCH_RENTAL_COMPANIES } from "../../reducers/rentalCompanies.js";

const mapStateToProps = state => ({
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchRentalCompanies: ({ token }) =>
    dispatch({ type: FETCH_RENTAL_COMPANIES, payload: { token } })
});

class RentalCompanies extends Component {
  static propTypes = {
    fetchRentalCompanies: PropTypes.func,
    isLoading: PropTypes.bool,
    token: PropTypes.string,
    rentalCompanies: PropTypes.array
  };

  static defaultProps = {
    isLoading: false,
    fetchRentalCompanies: () => {},
    rentalCompanies: []
  };

  state = {
    adminToShow: null,
    showToast: false,
    createNewModal: false
  };

  closeEditModal = this.closeEditModal.bind(this);
  editModalAndToast = this.editModalAndToast.bind(this);
  openNewModal = this.openNewModal.bind(this);
  closeNewModal = this.closeNewModal.bind(this);
  createNewModalAndToast = this.createNewModalAndToast.bind(this);

  componentDidMount() {
    this.props.fetchRentalCompanies({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {}

  tbodyGenerator({ rentalCompanies }) {
    return rentalCompanies.map((info, ind) => (
      <tr
        key={ind}
        className={
          info.isActive
            ? "rental-companies__column-active"
            : "rental-companies__column-inactive"
        }
        onClick={this.openEditModel.bind(this, info)}
      >
        <td>{ind}</td>
        <td>{info.userType}</td>
        <td>{info.email}</td>
        <td>{info.username}</td>
      </tr>
    ));
  }

  theadGenerater() {
    return (
      <tr>
        <th>#</th>
        <th>User Type</th>
        <th>Email</th>
        <th>Username</th>
      </tr>
    );
  }

  openEditModel(data) {
    this.setState({ adminToShow: data });
  }

  closeEditModal() {
    this.setState({ adminToShow: null });
  }

  openNewModal() {
    this.setState({ createNewModal: true });
  }

  closeNewModal() {
    this.setState({ createNewModal: false });
  }

  editModalAndToast() {
    this.setState({ adminToShow: null, showToast: "Update Successfully!" });
  }

  createNewModalAndToast() {
    this.setState({ createNewModal: false, showToast: "Create Successfully!" });
  }

  render() {
    const { adminToShow, showToast, createNewModal } = this.state;

    return (
      <div className="rental-companies-route">
        {!!showToast && (
          <Toast
            onClose={() => {
              this.setState({ showToast: false });
            }}
            show={true}
            delay={2000}
            autohide
          >
            <Toast.Body>{showToast}</Toast.Body>
          </Toast>
        )}
        <div className="rental-companies-route__title">
          <strong>Admins</strong>
          <Button onClick={this.openNewModal}>Create New</Button>
        </div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.admins && this.props.admins.length && (
            <div>
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
              <div className="rental-companies-route__legends">
                <p className="rental-companies-route__legends-green">Active</p>
                <p className="rental-companies-route__legends-red">Inactive</p>
              </div>
            </div>
          )}
        </ActivityIndicator>

        {/* {adminToShow && (
          <AdminModal
            toShow={true}
            data={adminToShow}
            handleClose={this.closeEditModal}
            handleEdit={this.props.editAdmin}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            rentalCompanies={this.props.rentalCompanies}
          />
        )} */}
        {adminToShow && (
          <EditModal
            toShow={true}
            data={adminToShow}
            inputs={editFieldConfig({
              rentalCompanies: this.props.rentalCompanies
            })}
            handleClose={this.closeEditModal}
            handleSubmit={this.props.editAdmin}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            formValuesTransformer={values => {
              const userId = values._id;

              delete values._id;
              delete values.password;
              delete values.__v;

              return { userId, fieldToUpdate: values };
            }}
          />
        )}
        {createNewModal && (
          <CreateNewModal
            toShow={true}
            handleClose={this.closeNewModal}
            handleSubmit={this.props.createNewAdmin}
            afterSubmitAction={this.createNewModalAndToast}
            inputs={createNewFieldConfig({
              rentalCompanies: this.props.rentalCompanies
            })}
            token={this.props.token}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalCompanies);
