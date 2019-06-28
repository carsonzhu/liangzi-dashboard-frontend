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

export default _ => (
  <div className="root-route">
    <div className="main-nav bg-white shadow-sm">
      <nav className="nav container">{generateTabs()}</nav>
    </div>
    <main className="">
      <Route exact path="/" component={Home} />
      {/* <Route path="/search" component={Search} />
      <Route path="/driverInfo" component={DriverInfo} />
      <Route path="/login" component={Login} />
      <Route path="/payment" component={Payment} />
      <Route path="/RentalListPage" component={RentalListPage} />
      <Route path="/RentalViewPage" component={RentalViewPage} /> */}
      <Footer />
    </main>
  </div>
);
