import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Toast, Button } from "react-bootstrap";
import "./Admins.css";

import ActivityIndicator from "../../utilities/activity-indicator";
// import AdminModal from "../../components/Modal/adminModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import { createNewFieldConfig, editFieldConfig } from "./config";

import {
  FETCH_ADMINS,
  EDIT_ADMINS,
  CREATE_NEW_ADMINS
} from "../../reducers/admins";

const mapStateToProps = state => ({
  isLoading: state.admins.loading,
  admins: state.admins.admins,
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: ({ token }) =>
    dispatch({ type: FETCH_ADMINS, payload: { token } }),
  editAdmin: ({ userId, fieldToUpdate, token }) =>
    dispatch({ type: EDIT_ADMINS, payload: { userId, fieldToUpdate, token } }),
  createNewAdmin: ({
    email,
    password,
    userType,
    username,
    allowedOperations,
    token,
    rentalCompanyId
  }) =>
    dispatch({
      type: CREATE_NEW_ADMINS,
      payload: {
        email,
        password,
        userType,
        username,
        allowedOperations,
        token,
        rentalCompanyId
      }
    })
});

class Admins extends Component {
  static propTypes = {
    fetchAdmins: PropTypes.func,
    isLoading: PropTypes.bool,
    admins: PropTypes.array,
    editAdmin: PropTypes.func,
    createNewAdmin: PropTypes.func,
    token: PropTypes.string,
    rentalCompanies: PropTypes.array
  };

  static defaultProps = {
    admins: [],
    isLoading: false,
    fetchAdmins: () => {},
    editAdmin: () => {},
    createNewAdmin: () => {},
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
    this.props.fetchAdmins({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {}

  tbodyGenerator({ admins }) {
    return admins.map((info, ind) => (
      <tr
        key={ind}
        className={
          info.isActive ? "admins__column-active" : "admins__column-inactive"
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
      <div className="admins-route">
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
        <div className="admins-route__title">
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
              <div className="admins-route__legends">
                <p className="admins-route__legends-green">Active</p>
                <p className="admins-route__legends-red">Inactive</p>
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
              // values: adminToShow
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
)(Admins);
