import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import "./Admins.css";

import ActivityIndicator from "../../utilities/activity-indicator";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch({ type: "FETCH_ADMINS" })
});

class Admins extends Component {
  static propTypes = {};

  operationGenerator(operations) {
    const listItems = operations.map((operation, ind) => (
      <li key={ind}>{operation}</li>
    ));

    return <ul style={{ "list-style-type": "disc" }}>{listItems}</ul>;
  }

  tbodyGenerator(admins) {
    return admins.map((info, ind) => (
      <tr key={ind}>
        <td>{ind}</td>
        <td>{info.email}</td>
        <td>{info.company}</td>
        <td>{this.operationGenerator(info.allowedOperations)}</td>
      </tr>
    ));
  }
  render() {
    return (
      <div className="admins-route">
        <div>Admins</div>
        <ActivityIndicator isLoading={false}>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Company</th>
                <th>Allowed Operations</th>
              </tr>
            </thead>
            <tbody>{this.tbodyGenerator(this.data)}</tbody>
          </Table>
        </ActivityIndicator>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins);
