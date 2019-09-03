import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Toast, Button, Modal } from "react-bootstrap";
import "./Cars.css";

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

import { checkVehicleAvailable, ordersTransform } from "./utilities";
import OrderHistory from "./OrderHistory";

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
    vehicleHistory: {}
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
    const classNamePicker = ({ status }) => {
      switch (status) {
        case "AVAILABLE":
          return "cars__column-active";
        case "RENTED":
          return "cars__column-inuse";
        case "UNAVAILABLE":
          return "cars__column-inactive";

        default:
          return "cars__column-active";
      }
    };

    return cars.map((info, ind) => (
      <tr
        key={ind}
        // className={classNamePicker({ status: info.vehicleStatus })}
        className={
          checkVehicleAvailable({
            orders: this.props.orders,
            vehicleId: info._id
          })
            ? "cars__column-active"
            : "cars__column-inuse"
        }
      >
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
                  History
                </button>
              </td>
            );
          } else if (field.key === "_id") {
            return (
              <td key={ind}>
                {info[field.key].slice(info[field.key].length - 5)}
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
      orderHistory
    } = this.state;

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
          {this.props.vehicles &&
            (this.props.vehicles.length ? (
              <div>
                <Table responsive hover>
                  <thead>{this.theadGenerater()}</thead>
                  <tbody>{this.tbodyGenerator(this.props.vehicles)}</tbody>
                </Table>

                <div className="cars-route__legends">
                  <p className="cars-route__legends-green">Active</p>
                  <p className="cars-route__legends-yellow">Rented</p>
                  {/* <p className="cars-route__legends-red">Inactive</p> */}
                </div>
              </div>
            ) : (
              <div>No Vehicle in the Record</div>
            ))}
        </ActivityIndicator>

        {/* {vehicleToShow && (
          <CarModal
            toShow={true}
            data={vehicleToShow}
            handleClose={this.clearVehicleInfo}
            handleEdit={this.props.updateVehicles}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            isSuper={this.props.userType === SUPER_ADMIN}
            rentalCompanies={this.props.rentalCompanies}
            insurances={this.props.insurances}
          />
        )} */}
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
