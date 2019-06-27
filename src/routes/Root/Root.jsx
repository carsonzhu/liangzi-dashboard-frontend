import React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Footer from "../../components/Footer";

export default _ => (
    <div className="root-route">
        <div className="main-nav bg-white shadow-sm">
            <nav className="nav container">
            </nav>
        </div>
        <main className="">
            <Route exact path="/" component={Home} />
        </main>
        <Footer />
    </div>
);
