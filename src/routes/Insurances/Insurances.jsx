import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table, Toast, Button } from "react-bootstrap";
import _ from "lodash";

import "./Insurances.css";

import ActivityIndicator from "../../utilities/activity-indicator";
// import InsuranceModal from "../../components/Modal/insuranceModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import { createNewFieldConfig, editFieldConfig } from "./config";

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
    return insurances.map((info = {}, ind) => (
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
    const errorMsg = _.get(
      this.props.error,
      "error.response.data.description",
      ""
    );

    this.setState({
      insuranceToShow: null,
      showToast: errorMsg || "Update Successfully!"
    });
  }

  createNewModalAndToast() {
    const errorMsg = _.get(
      this.props.error,
      "error.response.data.description",
      ""
    );

    this.setState({
      createNewModal: false,
      showToast: errorMsg || "Create Successfully!"
    });
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
          {this.props.insurances &&
            (this.props.insurances.length ? (
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
            ) : (
              <div>No Insurance in the Record</div>
            ))}
        </ActivityIndicator>

        {/* {insuranceToShow && (
          <InsuranceModal
            toShow={true}
            data={insuranceToShow}
            handleClose={this.closeEditModal}
            handleEdit={this.props.editInsurance}
            handleDelete={this.props.deleteInsurance}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
          />
        )} */}
        {insuranceToShow && (
          <EditModal
            toShow={true}
            data={insuranceToShow}
            inputs={editFieldConfig({
              rentalCompanies: this.props.rentalCompanies
            })}
            handleClose={this.closeEditModal}
            handleSubmit={this.props.editInsurance}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            formValuesTransformer={values => {
              const insuranceId = values._id;

              delete values._id;
              delete values.__v;

              return { insuranceId, fieldToUpdate: values };
            }}
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

export default Insurances;
