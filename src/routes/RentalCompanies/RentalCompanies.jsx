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
    rentalCompanyToShow: null,
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
          info.rentalCompanyStatus === "AVAILABLE"
            ? "rental-companies__column-active"
            : "rental-companies__column-inactive"
        }
        onClick={this.openEditModel.bind(this, info)}
      >
        <td>{ind}</td>
        <td>{info.name}</td>
        <td>{info.address}</td>
      </tr>
    ));
  }

  theadGenerater() {
    return (
      <tr>
        <th>#</th>
        <th>Company Name</th>
        <th>Company Address</th>
      </tr>
    );
  }

  openEditModel(data) {
    this.setState({ rentalCompanyToShow: data });
  }

  closeEditModal() {
    this.setState({ rentalCompanyToShow: null });
  }

  openNewModal() {
    this.setState({ createNewModal: true });
  }

  closeNewModal() {
    this.setState({ createNewModal: false });
  }

  editModalAndToast() {
    this.setState({
      rentalCompanyToShow: null,
      showToast: "Update Successfully!"
    });
  }

  createNewModalAndToast() {
    this.setState({ createNewModal: false, showToast: "Create Successfully!" });
  }

  render() {
    const { rentalCompanyToShow, showToast, createNewModal } = this.state;

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
          <strong>Rental Companies</strong>
          <Button onClick={this.openNewModal}>Create New</Button>
        </div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.rentalCompanies && this.props.rentalCompanies.length && (
            <div>
              <Table responsive hover>
                <thead>{this.theadGenerater()}</thead>

                <tbody>
                  {this.tbodyGenerator({
                    rentalCompanies: this.props.rentalCompanies
                  })}
                </tbody>
              </Table>
              <div className="rental-companies-route__legends">
                <p className="rental-companies-route__legends-green">Active</p>
                <p className="rental-companies-route__legends-red">Inactive</p>
              </div>
            </div>
          )}
        </ActivityIndicator>

        {/* {rentalCompanyToShow && (
          <AdminModal
            toShow={true}
            data={rentalCompanyToShow}
            handleClose={this.closeEditModal}
            handleEdit={this.props.editAdmin}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            rentalCompanies={this.props.rentalCompanies}
          />
        )} */}
        {rentalCompanyToShow && (
          <EditModal
            toShow={true}
            data={rentalCompanyToShow}
            inputs={editFieldConfig}
            handleClose={this.closeEditModal}
            handleSubmit={this.props.editAdmin}
            afterSubmitAction={this.editModalAndToast}
            token={this.props.token}
            formValuesTransformer={values => {
              const rentalCompanyId = values._id;

              delete values._id;
              delete values.__v;

              return { rentalCompanyId, fieldToUpdate: values };
            }}
          />
        )}
        {createNewModal && (
          <CreateNewModal
            toShow={true}
            handleClose={this.closeNewModal}
            handleSubmit={() => {}}
            afterSubmitAction={this.createNewModalAndToast}
            inputs={createNewFieldConfig()}
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
