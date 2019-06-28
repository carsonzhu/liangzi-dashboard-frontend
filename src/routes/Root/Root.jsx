import React from "react";
import { Route, NavLink } from "react-router-dom";

import Home from "../Home";
import Footer from "../../components/Footer";

import { urlTabs } from "./config";

import "./Root.css";

const generateTabs = () => {
  return urlTabs.map(tabInfo => (
    <NavLink exact={true} className="nav-link" to={tabInfo.link}>
      {tabInfo.title}
    </NavLink>
  ));
};

const generateTabComponent = () => {
  return urlTabs.map(tabInfo => (
    <Route path={tabInfo.link} component={tabInfo.component} />
  ));
};

export default _ => (
  <div className="root-route">
    <div className="main-nav bg-white shadow-sm">
      <nav className="nav container">{generateTabs()}</nav>
    </div>
    <main className="">
      <Route exact path="/" component={Home} />
      {generateTabComponent()}
      <Footer />
    </main>
  </div>
);
