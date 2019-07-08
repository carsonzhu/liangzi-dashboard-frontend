import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Header.css";

export default ({ displayName = "", signOutFunc = () => {} }) => {
  return (
    <div className="header">
      <p>Welcome {displayName}</p>
      <Button onClick={signOutFunc}>Log Out</Button>
    </div>
  );
};
