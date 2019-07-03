import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, NavLink } from "react-router-dom";

import { Modal } from "react-bootstrap";
import SignInForm from "../../components/Forms/SignInForm";
import AuthenticationWrapper from "../../utilities/authentication-wrapper";

import Home from "../Home";
import Footer from "../../components/Footer";

import { urlTabs } from "./config";

import "./Root.css";

class Root extends Component {
  static propTypes = {
    loginModal: PropTypes.bool
  };

  handleClose = this.handleClose.bind(this);

  generateTabs() {
    const tabs = [{ title: "Home", link: "/" }, ...urlTabs];

    return tabs.map((tabInfo, ind) => (
      <NavLink key={ind} exact={true} className="nav-link" to={tabInfo.link}>
        {tabInfo.title}
      </NavLink>
    ));
  }

  generateTabComponent() {
    return urlTabs.map((tabInfo, ind) => (
      <Route key={ind} path={tabInfo.link} component={tabInfo.component} />
    ));
  }

  handleClose() {
    console.log("handleClose");
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
            show={this.props.loginModal || true}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login In Form</Modal.Title>
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

export default AuthenticationWrapper(Root);
