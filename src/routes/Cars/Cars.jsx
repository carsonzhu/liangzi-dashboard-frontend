import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Table, Toast, Button, Modal, Form } from "react-bootstrap";
import "./Cars.css";

import Calendar from "react-calendar";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ActivityIndicator from "../../utilities/activity-indicator";

// import CarModal from "../../components/Modal/carModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import EditModal from "../../components/Modal/editModal";
import {
  header,
  createNewFieldConfig,
  getRentalCompanyName,
  editFieldConfig
} from "./config";

import { vehicleStatus, vehicleTypeDropdown, applyFilter } from "./utilities";
import OrderHistory from "./OrderHistory";
import { rentalCompanyDropdownHelper } from "../RentalCompanies/config";

class Cars extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    vehicles: PropTypes.array,
    token: PropTypes.string,
    rentalCompanies: PropTypes.array,
    fetchInsurances: PropTypes.func,
    updateVehicles: PropTypes.func,
    addVehicle: PropTypes.func,
    orders: PropTypes.array
  };

  static defaultProps = {
    vehicles: [],
    isLoading: false,
    token: "",
    rentalCompanies: [],
    createVehicle: () => {},
    orders: []
  };

  state = {
    vehicleToShow: null,
    showToast: false,
    createNewModal: false,
    orderHistory: null,
    vehicleHistory: {},
    filterRentalCompanyId: "All",
    filterVehicleStatus: null,
    filterVehicleType: null,
    filterDate: moment(),
    filterDisplay: false
  };

  clearVehicleInfo = this.clearVehicleInfo.bind(this);
  openNewModal = this.openNewModal.bind(this);
  closeNewModal = this.closeNewModal.bind(this);
  createNewModalAndToast = this.createNewModalAndToast.bind(this);
  editModalAndToast = this.editModalAndToast.bind(this);
  clearOrderHistory = this.clearOrderHistory.bind(this);

  componentDidMount() {
    this.props.fetchVehicles({ token: this.props.token });
    this.props.fetchInsurances({ token: this.props.token });
    // this.setState({
    //   vehicleHistory: ordersTransform({ orders: this.props.orders })
    // });
  }

  componentDidUpdate(prevProps) {
    // this.setState({
    //   vehicleHistory: ordersTransform({ orders: this.props.orders })
    // });
  }

  vehicleInfoShow(info) {
    this.setState({ vehicleToShow: info });
  }

  clearVehicleInfo() {
    this.setState({ vehicleToShow: null });
  }

  openNewModal() {
    this.setState({ createNewModal: true });
  }

  closeNewModal() {
    this.setState({ createNewModal: false });
  }

  editModalAndToast() {
    this.setState({ vehicleToShow: null, showToast: "Update Successfully!" });
  }

  createNewModalAndToast() {
    this.setState({ createNewModal: false, showToast: "Create Successfully!" });
  }

  orderHistoryShow(info) {
    this.setState({ orderHistory: info });
  }

  clearOrderHistory() {
    this.setState({ orderHistory: null });
  }

  theadGenerater() {
    return (
      <tr>
        {header(this.props.userType).map((field, ind) => {
          return <th key={ind}>{field.title}</th>;
        })}
      </tr>
    );
  }

  tbodyGenerator(cars) {
    return cars.map((info, ind) => (
      <tr key={ind}>
        {header(this.props.userType).map((field, ind) => {
          if (field.key === "rentalCompanyId") {
            const rentalCompanyId = info[field.key];

            return (
              <td key={ind}>
                {getRentalCompanyName({
                  rentalCompanyId,
                  rentalCompanies: this.props.rentalCompanies
                })}
              </td>
            );
          } else if (field.key === "action") {
            return (
              <td key={ind} style={{ display: "flex", flexDirection: "row" }}>
                <button onClick={this.vehicleInfoShow.bind(this, info)}>
                  Edit
                </button>
                <button
                  onClick={this.orderHistoryShow.bind(
                    this,
                    this.props.orders.filter(
                      order => order.vehicleId === info._id
                    )
                  )}
                >
                  Order Info
                </button>
              </td>
            );
          } else if (field.key === "_id") {
            return <td key={ind}>{info[field.key].slice(-5)}</td>;
          } else if (field.key === "vehicleStatus") {
            return (
              <td key={ind}>
                {vehicleStatus({
                  vehicleStatus: info.vehicleStatus,
                  vehicleId: info._id,
                  orders: this.props.orders,
                  date: this.state.filterDate
                })}
              </td>
            );
          } else {
            return <td key={ind}>{info[field.key]}</td>;
          }
        })}
      </tr>
    ));
  }

  render() {
    const {
      vehicleToShow,
      createNewModal,
      showToast,
      orderHistory,
      filterDisplay,
      filterRentalCompanyId,
      filterVehicleStatus,
      filterVehicleType
    } = this.state;

    const rentalCompaniesFilter = [
      { label: "All", value: "All" },
      ...rentalCompanyDropdownHelper({
        rentalCompanies: this.props.rentalCompanies
      })
    ];

    const statusFilter = [
      { label: "All", value: "All" },
      { label: "Unavailable", value: "Unavailable" },
      { label: "Available", value: "Available" },
      { label: "Rented", value: "Rented" },
      { label: "Pickup", value: "Pickup" },
      { label: "Return", value: "Return" }
    ];

    const vehicleTypeFilter = [
      { label: "All", value: "All" },
      ...vehicleTypeDropdown({ cars: this.props.vehicles })
    ];

    const filteredVehicles = this.props.vehicles.filter(car =>
      applyFilter({ car, states: this.state, orders: this.props.orders })
    );

    return (
      <div className="cars-route">
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

        <div className="cars-route__title">
          <strong>Vehicles</strong>
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
                <Form.Group>
                  <Form.Label>Vehicle Status</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={value =>
                      this.setState({
                        filterVehicleStatus: value.target.value
                      })
                    }
                  >
                    {statusFilter.map(option => {
                      if (option.value === filterVehicleStatus) {
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
                <Form.Group>
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={value =>
                      this.setState({
                        filterVehicleType: value.target.value
                      })
                    }
                  >
                    {vehicleTypeFilter.map(option => {
                      if (option.value === filterVehicleType) {
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
                <Calendar
                  onChange={date => this.setState({ filterDate: moment(date) })}
                  value={this.state.filterDate.toDate()}
                />
              </div>
            )}
            {filteredVehicles.length ? (
              <Table striped responsive hover>
                <thead>{this.theadGenerater()}</thead>
                <tbody>{this.tbodyGenerator(filteredVehicles)}</tbody>
              </Table>
            ) : (
              <div>No Vehicle in the Record</div>
            )}
          </div>
        </ActivityIndicator>

        {vehicleToShow && (
          <EditModal
            toShow={true}
            data={vehicleToShow}
            inputs={editFieldConfig({
              rentalCompanies: this.props.rentalCompanies,
              insurances: this.props.insurances,
              userType: this.props.userType
            })}
            handleClose={this.clearVehicleInfo}
            handleSubmit={this.props.updateVehicles}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            formValuesTransformer={values => {
              const vehicleId = values._id;

              delete values._id;
              delete values.__v;

              return { vehicleId, fieldToUpdate: values };
            }}
          />
        )}
        {createNewModal && (
          <CreateNewModal
            toShow={true}
            handleClose={this.closeNewModal}
            handleSubmit={this.props.addVehicle}
            afterSubmitAction={this.createNewModalAndToast}
            inputs={createNewFieldConfig({
              rentalCompanies: this.props.rentalCompanies,
              insurances: this.props.insurances
            })}
            token={this.props.token}
          />
        )}
        {orderHistory && (
          <Modal size="lg" show={true} onHide={this.clearOrderHistory}>
            <Modal.Header closeButton>
              <Modal.Title>Order History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!orderHistory.length ? (
                "No order for this vehicle yet"
              ) : (
                <OrderHistory
                  data={orderHistory}
                  insurances={this.props.insurances}
                  selectedDate={this.state.filterDate}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.clearOrderHistory}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default Cars;
