import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

class ActivityIndicator extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    return this.props.isLoading ? (
      <div className="activity-indicator">
        <p>loading...</p>
        <Spinner animation="border" />
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

export default ActivityIndicator;
