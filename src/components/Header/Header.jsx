import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Header.css";

export default ({ displayName = "", signOutFunc = () => {} }) => {
  return (
    <div className="header">
      <p className="header__welcome">Welcome, {displayName}!</p>
      <Button className="header__logout-button" onClick={signOutFunc}>
        Log Out
      </Button>
    </div>
  );
};
