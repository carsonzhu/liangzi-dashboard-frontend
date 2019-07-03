import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openLoginModal, closeLoginModal } from "../actioins/componentState";

const mapStateToProps = state => ({
  userType: state.login.userType,
  token: state.login.token
});

const mapDispatchToProps = {
  openLoginModal,
  closeLoginModal
};

export const authenticationWrapper = WrappedComponent => {
  class AuthenticationWrapper extends Component {
    static propTypes = {
      userType: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      openLoginModal: PropTypes.func,
      closeLoginModal: PropTypes.func
    };

    static WrappedComponent = WrappedComponent;

    checkIfLoggedIn({ userType, token }) {
      return !!userType && !!token;
    }

    componentDidMount() {
      // hasnt logged in
      if (
        !this.checkIfLoggedIn({
          userType: this.props.userType,
          token: this.props.token
        })
      ) {
        this.props.openLoginModal();
      }
    }

    componentDidUpdate(prevProps) {
      // has logged in
      if (
        !this.checkIfLoggedIn({
          userType: prevProps.userType,
          token: prevProps.token
        }) &&
        this.checkIfLoggedIn({
          userType: this.props.userType,
          token: this.props.token
        })
      ) {
        this.props.closeLoginModal();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return AuthenticationWrapper;
};

export default component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(authenticationWrapper(component));
