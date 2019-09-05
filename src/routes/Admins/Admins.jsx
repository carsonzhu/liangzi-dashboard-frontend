import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table, Toast, Button, Form } from "react-bootstrap";
import "./Admins.css";

import ActivityIndicator from "../../utilities/activity-indicator";
// import AdminModal from "../../components/Modal/adminModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import { createNewFieldConfig, editFieldConfig } from "./config";

import { applyFilter } from "./utilities";
import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    this.props.fetchAdmins({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {}

  tbodyGenerator({ admins }) {
    const displayCompany = ({ rentalCompanyId }) => {
      for (let i = 0; i < this.props.rentalCompanies.length; i++) {
        let company = this.props.rentalCompanies[i];

        if (company._id === rentalCompanyId) {
          return company.name;
        }
      }

      return "None";
    };

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
        <td>
          {info.userType === "superAdmin"
            ? "SUPER"
            : displayCompany({ rentalCompanyId: info.rentalCompanyId })}
        </td>
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
        <th>Company</th>
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
    const {
      adminToShow,
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

    const filteredAdmins = this.props.admins.filter(admin =>
      applyFilter({ admin, states: this.state })
    );

    if (sorting) {
      filteredAdmins.sort((a, b) => {
        switch (sorting) {
          case "email":
            return a.email.localeCompare(b.email);
          case "username": {
            return a.username.localeCompare(b.username);
          }
          default:
            return 0;
        }
      });
    }

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
                      sorting === "username" ? "sorting-button__active" : ""
                    }
                    onClick={() =>
                      this.setState({
                        sorting: sorting === "username" ? null : "username"
                      })
                    }
                  >
                    Sort By Username
                  </p>
                  <p
                    className={
                      sorting === "email" ? "sorting-button__active" : ""
                    }
                    onClick={() =>
                      this.setState({
                        sorting: sorting === "email" ? null : "email"
                      })
                    }
                  >
                    Sort By Email
                  </p>
                </div>
              </div>
            )}
            {filteredAdmins.length ? (
              <Table responsive hover>
                <thead>
                  {this.theadGenerater({
                    fields: Object.keys(this.props.admins[0])
                  })}
                </thead>

                <tbody>{this.tbodyGenerator({ admins: filteredAdmins })}</tbody>
              </Table>
            ) : (
              <p>No admin in the record</p>
            )}
            <div className="admins-route__legends">
              <p className="admins-route__legends-green">Active</p>
              <p className="admins-route__legends-red">Inactive</p>
            </div>
          </div>
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
              const fieldToUpdate = { ...values };

              delete fieldToUpdate._id;
              delete fieldToUpdate.__v;
              delete fieldToUpdate.password;

              return { userId, fieldToUpdate };
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

export default Admins;
