import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import "./SignInForm.css";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: ({ email, passowrd }) =>
    dispatch({
      type: "LOGGING_IN",
      payload: { email, passowrd }
    })
});

class SignInForm extends Component {
  static propTypes = {
    login: PropTypes.func
  };

  render() {
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
