import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { checkForCached } from "./cache-handler";
import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL
} from "../reducers/componentState";
import { LOGIN_SUCC } from "../reducers/login";

const mapStateToProps = state => ({
  userType: state.login.userType,
  token: state.login.token,
  userId: state.login.userId
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL }),
  closeLoginModal: () => dispatch({ type: CLOSE_LOGIN_MODAL }),
  setLoginFromCookie: ({ userId, userToken, userType, username }) =>
    dispatch({
      type: LOGIN_SUCC,
      payload: { userId, userType, token: userToken, username }
    })
});

export const authenticationWrapper = WrappedComponent => {
  class AuthenticationWrapper extends Component {
    static propTypes = {
      userType: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      openLoginModal: PropTypes.func,
      closeLoginModal: PropTypes.func
    };

    static WrappedComponent = WrappedComponent;

    checkLoginCache() {
      const cachedItems = checkForCached({ name: "userLogin" });

      return !!cachedItems;
    }

    checkIfLoggedIn({ userType, token, userId }) {
      return !!userType && !!token && !!userId;
    }

    setUserFromCached() {
      const cachedItems = checkForCached({ name: "userLogin" });

      const { userId, userToken, userType, username } = JSON.parse(cachedItems);

      this.props.setLoginFromCookie({
        userId,
        userToken,
        userType,
        username
      });
    }

    componentDidMount() {
      // hasnt logged in
      if (
        !this.checkLoginCache() &&
        !this.checkIfLoggedIn({
          userType: this.props.userType,
          token: this.props.token,
          userId: this.props.userId
        })
      ) {
        this.props.openLoginModal();
      } else if (this.checkLoginCache()) {
        this.setUserFromCached();
      }
    }

    componentDidUpdate(prevProps) {
      const loggedInCurrently = this.checkIfLoggedIn({
        userType: this.props.userType,
        token: this.props.token,
        userId: this.props.userId
      });

      if (!loggedInCurrently) {
        this.props.openLoginModal();
      }
      // has logged in
      else if (
        !this.checkIfLoggedIn({
          userType: prevProps.userType,
          token: prevProps.token,
          userId: prevProps.userId
        }) &&
        loggedInCurrently
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
