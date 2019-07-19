import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Toast, Button } from "react-bootstrap";
import "./Cars.css";

import ActivityIndicator from "../../utilities/activity-indicator";
import CarModal from "../../components/Modal/carModal";
import CreateNewModal from "../../components/Modal/createNewModal";
import { header, createNewFieldConfig } from "./config";

import { FETCH_VEHICLES } from "../../reducers/cars";

const mapStateToProps = state => ({
  isLoading: state.cars.loading,
  vehicles: state.cars.vehicles,
  token: state.login.token,
  rentalCompanies: state.cars.rentalCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles: ({ token }) =>
    dispatch({ type: FETCH_VEHICLES, payload: { token } })
});

class Cars extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    vehicles: PropTypes.array,
    token: PropTypes.string,
    rentalCompanies: PropTypes.array
  };

  static defaultProps = {
    vehicles: [],
    isLoading: false,
    token: "",
    rentalCompanies: []
  };

  state = {
    vehicleToShow: null,
    createNewModal: false
  };

  clearVehicleInfo = this.clearVehicleInfo.bind(this);
  openNewModal = this.openNewModal.bind(this);
  closeNewModal = this.closeNewModal.bind(this);

  componentDidMount() {
    this.props.fetchVehicles({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {}

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

  createNewModalAndToast() {
    this.setState({ createNewModal: false, showToast: "Create Successfully!" });
  }

  theadGenerater() {
    return (
      <tr>
        {header.map((field, ind) => {
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
        className={classNamePicker({ status: info.vehicleStatus })}
        onClick={this.vehicleInfoShow.bind(this, info)}
      >
        {header.map((field, ind) => {
          if (field.key === "rentalCompanyId") {
            const rentalCompanyId = info[field.key];
            let rentalCompany = "";

            this.props.rentalCompanies.forEach(rentalCompanyInfo => {
              if (rentalCompanyId === rentalCompanyInfo._id) {
                rentalCompany = rentalCompanyInfo.name;
              }
            });

            return <td key={ind}>{rentalCompany}</td>;
          }

          return <td key={ind}>{info[field.key]}</td>;
        })}
      </tr>
    ));
  }
  render() {
    const { vehicleToShow, createNewModal, showToast } = this.state;

    console.log("this.props.vehicles", this.props.vehicles);
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
          <strong>Admins</strong>
          <Button onClick={this.openNewModal}>Create New</Button>
        </div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.vehicles && this.props.vehicles.length && (
            <div>
              <Table responsive hover>
                <thead>{this.theadGenerater()}</thead>
                <tbody>{this.tbodyGenerator(this.props.vehicles)}</tbody>
              </Table>

              <div className="cars-route__legends">
                <p className="cars-route__legends-green">Active</p>
                <p className="cars-route__legends-yellow">Rented</p>
                <p className="cars-route__legends-red">Inactive</p>
              </div>
            </div>
          )}
        </ActivityIndicator>

        {vehicleToShow && (
          <CarModal
            toShow={true}
            data={vehicleToShow}
            handleClose={this.clearVehicleInfo}
            handleEdit={() => {}}
            afterSubmitAction={() => {}}
            token={this.props.token}
          />
        )}
        {createNewModal && (
          <CreateNewModal
            toShow={true}
            handleClose={this.closeNewModal}
            handleSubmit={() => {}}
            afterSubmitAction={() => {}}
            inputs={createNewFieldConfig}
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
)(Cars);
