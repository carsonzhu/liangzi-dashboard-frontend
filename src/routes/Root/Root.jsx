import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Modal } from "react-bootstrap";
import SignInForm from "../../components/Forms/SignInForm";
import AuthenticationWrapper from "../../utilities/authentication-wrapper";

import Home from "../Home";
import Footer from "../../components/Footer";

import { superAdminTabs, normalAdminTabs } from "./config";
import { SUPER_ADMIN } from "../../constants";

import "./Root.css";

const mapStateToProps = state => ({
  loginModal: state.componentState.loginModal,
  userType: state.login.userType,
  token: state.login.token
});

const mapDispatchToProps = dispatch => ({});

class Root extends Component {
  static propTypes = {
    loginModal: PropTypes.bool,
    userType: PropTypes.string,
    token: PropTypes.string
  };

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

  render() {
    return (
      <div className="root-route">
        <div className="main-nav bg-white shadow-sm">
          <nav className="nav container">{this.generateTabs()}</nav>
        </div>
        <main className="content">
          <Route exact path="/" component={Home} />
          {this.generateTabComponent()}
          <Footer />
          <Modal
            size="lg"
            dialogClassName="modal-90w"
            show={this.props.loginModal}
            // show={false}
          >
            <Modal.Header closeButton>
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
