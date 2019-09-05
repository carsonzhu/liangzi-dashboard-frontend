import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table, Toast, Button, Form } from "react-bootstrap";
import _ from "lodash";

import "./Insurances.css";

import ActivityIndicator from "../../utilities/activity-indicator";
// import InsuranceModal from "../../components/Modal/insuranceModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import { createNewFieldConfig, editFieldConfig } from "./config";

import { applyFilter } from "./utilities";
import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    createNewModal: false,
    filterRentalCompanyId: "All",
    filterDisplay: false,
    sorting: null
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
    const {
      insuranceToShow,
      showToast,
      createNewModal,
      filterRentalCompanyId,
      filterDisplay,
      sorting
    } = this.state;

    const rentalCompaniesFilter = [
      { label: "All", value: "All" },
      ...rentalCompanyDropdownHelper({
        rentalCompanies: this.props.rentalCompanies
      })
    ];

    const filteredInsurances = this.props.insurances.filter(insurance =>
      applyFilter({ insurance, states: this.state })
    );

    if (sorting) {
      filteredInsurances.sort((a, b) => {
        switch (sorting) {
          case "name":
            return a.name.localeCompare(b.name);
          case "rate": {
            if (a.dailyRate > b.dailyRate) {
              return 1;
            } else if (a.dailyRate < b.dailyRate) {
              return -1;
            } else {
              return 0;
            }
          }
          default:
            return 0;
        }
      });
    }

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
          <div>
            <div
              className="cars-route__filter-toggle"
              style={
                filterDisplay ? { paddingTop: "1rem" } : { padding: "1rem 0" }
              }
            >
              filter
              {!filterDisplay ? (
                <IoIosArrowDown
                  className="cars-route__filter-toggle-btn"
                  onClick={() => this.setState({ filterDisplay: true })}
                />
              ) : (
                <IoIosArrowUp
                  className="cars-route__filter-toggle-btn"
                  onClick={() => this.setState({ filterDisplay: false })}
                />
              )}
            </div>
            {filterDisplay && (
              <div className="cars-route__filter">
                {this.props.userType === "superAdmin" && (
                  <Form.Group>
                    <Form.Label>Rental Company</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={value =>
                        this.setState({
                          filterRentalCompanyId: value.target.value
                        })
                      }
                    >
                      {rentalCompaniesFilter.map(option => {
                        if (option.value === filterRentalCompanyId) {
                          return (
                            <option value={option.value} selected>
                              {option.label}
                            </option>
                          );
                        }
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                )}
                <div className="sorting-button">
                  <p
                    className={
                      sorting === "name" ? "sorting-button__active" : ""
                    }
                    onClick={() =>
                      this.setState({
                        sorting: sorting === "name" ? null : "name"
                      })
                    }
                  >
                    Sort By Name
                  </p>
                  <p
                    className={
                      sorting === "rate" ? "sorting-button__active" : ""
                    }
                    onClick={() =>
                      this.setState({
                        sorting: sorting === "rate" ? null : "rate"
                      })
                    }
                  >
                    Sort By Rate
                  </p>
                </div>
              </div>
            )}
            {filteredInsurances.length ? (
              <Table striped responsive hover>
                <thead>
                  {this.theadGenerater({
                    fields: Object.keys(this.props.insurances[0])
                  })}
                </thead>

                <tbody>
                  {this.tbodyGenerator({ insurances: filteredInsurances })}
                </tbody>
              </Table>
            ) : (
              <div>No Insurance in the Record</div>
            )}
          </div>
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
              const fieldToUpdate = { ...values };

              delete fieldToUpdate._id;
              delete fieldToUpdate.__v;

              return { insuranceId, fieldToUpdate };
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
