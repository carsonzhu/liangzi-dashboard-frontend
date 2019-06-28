import React from "react";
import "./Home.css";

import SignInForm from "../../components/Forms/SignInForm";

const Home = () => {
  return (
    <div className="home-route">
      <div>HOME</div>
      <SignInForm />
    </div>
  );
};

export default Home;
