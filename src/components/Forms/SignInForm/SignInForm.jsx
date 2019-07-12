import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";

import "./SignInForm.css";

const mapStateToProps = state => ({
  error: state.login.error
});

const mapDispatchToProps = dispatch => ({
  login: ({ email, password }) =>
    dispatch({
      type: "LOGGING_IN",
      payload: { email, password }
    })
});

class SignInForm extends Component {
  static propTypes = {
    login: PropTypes.func,
    error: PropTypes.string
  };

  render() {
    console.log("error", this.props.error);
    return (
      <div className="signInForm">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, _) => {
            console.log("values", values);
            this.props.login(values);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                {this.props.error && (
                  <Alert variant="danger">{this.props.error}</Alert>
                )}
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  name="email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  name="password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
