import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Toast } from "react-bootstrap";
import "./Admins.css";

import ActivityIndicator from "../../utilities/activity-indicator";
import AdminModal from "../../components/Modal/adminModal";

import { FETCH_ADMINS, EDIT_ADMINS } from "../../reducers/admins";

const mapStateToProps = state => ({
  isLoading: state.admins.loading,
  admins: state.admins.admins
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: () => dispatch({ type: FETCH_ADMINS }),
  editAdmin: ({ userId, fieldToUpdate }) =>
    dispatch({ type: EDIT_ADMINS, payload: { userId, fieldToUpdate } })
});

class Admins extends Component {
  static propTypes = {
    fetchAdmins: PropTypes.func,
    isLoading: PropTypes.bool,
    admins: PropTypes.array,
    editAdmin: PropTypes.func
  };

  static defaultProps = {
    admins: [],
    isLoading: false,
    fetchAdmins: () => {},
    editAdmin: () => {}
  };

  state = {
    adminToShow: null,
    adminToEdit: null,
    showToast: false
  };

  closeModal = this.closeModal.bind(this);
  modalAndToast = this.modalAndToast.bind(this);

  tbodyGenerator({ admins }) {
    return admins.map((info, ind) => (
      <tr
        key={ind}
        className={
          info.isActive ? "admins__column-active" : "admins__column-inactive"
        }
        onClick={this.openModel.bind(this, info)}
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

  componentDidMount() {
    this.props.fetchAdmins();
  }

  componentDidUpdate(prevProps) {}

  openModel(data) {
    this.setState({ adminToShow: data });
  }

  closeModal() {
    this.setState({ adminToShow: null });
  }

  modalAndToast() {
    this.setState({ adminToShow: null, showToast: true });
  }

  render() {
    const { adminToShow, showToast } = this.state;

    return (
      <div className="admins-route">
        <Toast
          onClose={() => {
            this.setState({ showToast: false });
          }}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body>Update Successfully!</Toast.Body>
        </Toast>
        <div>Admins</div>
        <ActivityIndicator isLoading={this.props.isLoading}>
          {this.props.admins && this.props.admins.length && (
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
          )}
        </ActivityIndicator>

        {adminToShow && (
          <AdminModal
            toShow={true}
            data={adminToShow}
            handleClose={this.closeModal}
            handleEdit={this.props.editAdmin}
            afterSubmitAction={this.modalAndToast}
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
