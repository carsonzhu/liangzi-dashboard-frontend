import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  loading: state.login.loading,
  userType: state.login.userType,
  token: state.login.token
});

export const authenticationWrapper = WrappedComponent => {
  class AuthenticationWrapper extends Component {
    static propTypes = {
      loading: PropTypes.bool,
      userType: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired
    };

    static defaultProps = {
      loading: false
    };

    static WrappedComponent = WrappedComponent;

    state = {};

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    componentWillUnmount() {}

    render() {
      console.log("this.props", this.props);
      return <WrappedComponent {...this.props} />;
    }
  }

  return AuthenticationWrapper;
};

export default component =>
  connect(mapStateToProps)(authenticationWrapper(component));
