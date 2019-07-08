import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Modal } from "react-bootstrap";
import SignInForm from "../../components/Forms/SignInForm";
import AuthenticationWrapper from "../../utilities/authentication-wrapper";
import { clearCachedData } from "../../utilities/cache-handler";

import Home from "../Home";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { superAdminTabs, normalAdminTabs } from "./config";
import { SUPER_ADMIN } from "../../constants";
import { LOGOUT } from "../../reducers/login";

import "./Root.css";

const mapStateToProps = state => ({
  loginModal: state.componentState.loginModal,
  userType: state.login.userType,
  token: state.login.token,
  username: state.login.username
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: LOGOUT })
});

class Root extends Component {
  static propTypes = {
    loginModal: PropTypes.bool,
    userType: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    logOut: PropTypes.func
  };

  logOutFunc = this.logOutFunc.bind(this);

  generateTabs() {
    if (this.props.userType === SUPER_ADMIN) {
      return superAdminTabs.map((tabInfo, ind) => (
        <NavLink key={ind} exact={true} className="nav-link" to={tabInfo.link}>
          {tabInfo.title}
        </NavLink>
      ));
    }

    return normalAdminTabs.map((tabInfo, ind) => (
      <NavLink key={ind} exact={true} className="nav-link" to={tabInfo.link}>
        {tabInfo.title}
      </NavLink>
    ));
  }

  generateTabComponent() {
    if (this.props.userType === SUPER_ADMIN) {
      return superAdminTabs.map((tabInfo, ind) => (
        <Route key={ind} path={tabInfo.link} component={tabInfo.component} />
      ));
    }

    return normalAdminTabs.map((tabInfo, ind) => (
      <Route key={ind} path={tabInfo.link} component={tabInfo.component} />
    ));
  }

  logOutFunc() {
    this.props.logOut();
    clearCachedData();
  }

  render() {
    return (
      <div className="root-route">
        <div className="main-nav bg-white shadow-sm">
          <nav className="nav container">{this.generateTabs()}</nav>
        </div>
        <main className="content">
          <Header
            displayName={this.props.username}
            signOutFunc={this.logOutFunc}
          />
          <Route exact path="/" component={Home} />
          {this.generateTabComponent()}
          <Footer />
          <Modal
            size="lg"
            dialogClassName="modal-90w"
            onHide={() => {}}
            show={this.props.loginModal}
            // show={false}
          >
            <Modal.Header>
              <Modal.Title>Login Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignInForm />
            </Modal.Body>
          </Modal>
        </main>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationWrapper(Root));
