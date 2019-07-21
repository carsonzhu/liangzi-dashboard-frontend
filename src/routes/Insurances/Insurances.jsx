import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Toast, Button } from "react-bootstrap";
import "./Insurances.css";

import ActivityIndicator from "../../utilities/activity-indicator";
import InsuranceModal from "../../components/Modal/insuranceModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import { createNewFieldConfig } from "./config";

import {
  FETCH_INSURANCES,
  EDIT_INSURANCE,
  CREATE_NEW_INSURANCE,
  DELETE_INSURANCE
} from "../../reducers/insurances";

const mapStateToProps = state => ({
  isLoading: state.insurances.loading,
  insurances: state.insurances.insurances,
  token: state.login.token,
  rentalCompanies: state.rentalCompanies.rentalCompanies,
  error: state.insurances.error
});

const mapDispatchToProps = dispatch => ({
  fetchInsurances: ({ token }) =>
    dispatch({ type: FETCH_INSURANCES, payload: { token } }),
  editInsurance: ({ insuranceId, fieldToUpdate, token }) =>
    dispatch({
      type: EDIT_INSURANCE,
      payload: { insuranceId, fieldToUpdate, token }
    }),
  deleteInsurance: ({ insuranceId, token }) =>
    dispatch({
      type: DELETE_INSURANCE,
      payload: { insuranceId, token }
    }),
  createNewInsurances: ({
    rentalCompanyId,
    rentalCompanyName,
    name,
    description,
    dailyRate,
    dailyRateUnit,
    token
  }) =>
    dispatch({
      type: CREATE_NEW_INSURANCE,
      payload: {
        rentalCompanyId,
        rentalCompanyName,
        name,
        description,
        dailyRate,
        dailyRateUnit,
        token
      }
    })
});

class Insurances extends Component {
  static propTypes = {
    fetchInsurances: PropTypes.func,
    isLoading: PropTypes.bool,
    insurances: PropTypes.array,
    editInsurance: PropTypes.func,
    deleteInsurance: PropTypes.func,
    createNewInsurances: PropTypes.func,
    token: PropTypes.string,
    rentalCompanies: PropTypes.object
  };

  static defaultProps = {
    insurances: [],
    isLoading: false,
    fetchInsurances: () => {},
    editInsurance: () => {},
    deleteInsurance: () => {},
    createNewInsurances: () => {}
  };

  state = {
    insuranceToShow: null,
    showToast: false,
    createNewModal: false
  };

  closeEditModal = this.closeEditModal.bind(this);
  editModalAndToast = this.editModalAndToast.bind(this);
  openNewModal = this.openNewModal.bind(this);
  closeNewModal = this.closeNewModal.bind(this);
  createNewModalAndToast = this.createNewModalAndToast.bind(this);

  componentDidMount() {
    this.props.fetchInsurances({ token: this.props.token });
  }

  tbodyGenerator({ insurances }) {
    return insurances.map((info, ind) => (
      <tr key={ind} onClick={this.openEditModel.bind(this, info)}>
        <td>{ind}</td>
        <td>{info.rentalCompanyName}</td>
        <td>{info.name}</td>
        <td>{info.description}</td>
        <td>{info.dailyRate}</td>
        <td>{info.dailyRateUnit}</td>
      </tr>
    ));
  }

  theadGenerater() {
    return (
      <tr>
        <th>#</th>
        <th>Rental Company Name</th>
        <th>Name</th>
        <th>Description</th>
        <th>Daily Rate</th>
        <th>Daily Rate Unit</th>
      </tr>
    );
  }

  openEditModel(data) {
    this.setState({ insuranceToShow: data });
  }

  closeEditModal() {
    this.setState({ insuranceToShow: null });
  }

  openNewModal() {
    this.setState({ createNewModal: true });
  }

  closeNewModal() {
    this.setState({ createNewModal: false });
  }

  editModalAndToast() {
    this.setState({ insuranceToShow: null, showToast: "Update Successfully!" });
  }

  createNewModalAndToast() {
    this.setState({ createNewModal: false, showToast: "Create Successfully!" });
  }

  render() {
    const { insuranceToShow, showToast, createNewModal } = this.state;

    return (
      <div className="insurances-route">
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
        <div className="insurances-route__title">
          <strong>Insurances</strong>
          <Button onClick={this.openNewModal}>Create New</Button>
        </div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.insurances && this.props.insurances.length && (
            <div>
              <Table responsive hover>
                <thead>
                  {this.theadGenerater({
                    fields: Object.keys(this.props.insurances[0])
                  })}
                </thead>

                <tbody>
                  {this.tbodyGenerator({ insurances: this.props.insurances })}
                </tbody>
              </Table>
            </div>
          )}
        </ActivityIndicator>

        {insuranceToShow && (
          <InsuranceModal
            toShow={true}
            data={insuranceToShow}
            handleClose={this.closeEditModal}
            handleEdit={this.props.editInsurance}
            handleDelete={this.props.deleteInsurance}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
          />
        )}
        {createNewModal && (
          <CreateNewModal
            toShow={true}
            handleClose={this.closeNewModal}
            handleSubmit={this.props.createNewInsurances}
            afterSubmitAction={this.createNewModalAndToast}
            inputs={createNewFieldConfig(this.props.rentalCompanies)}
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
)(Insurances);
