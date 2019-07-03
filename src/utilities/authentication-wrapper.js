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

    checkIfLoggedIn() {
      return !!this.props.userType && !!this.props.token;
    }

    showLoginModal() {
      //TODO: use redux-saga to open modal
      console.log("opening login modal");
    }

    componentDidMount() {
      if (!this.checkIfLoggedIn()) {
        this.showLoginModal();
      }
    }

    componentDidUpdate(prevProps) {
      if (!this.checkIfLoggedIn()) {
        this.showLoginModal();
      }
    }

    render() {
      console.log("this.props", this.props);
      return <WrappedComponent {...this.props} />;
    }
  }

  return AuthenticationWrapper;
};

export default component =>
  connect(mapStateToProps)(authenticationWrapper(component));
