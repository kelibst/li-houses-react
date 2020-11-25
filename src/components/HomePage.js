import React from "react";
import Header from "./layouts/Header";
import "./HomePage.scss";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="content">
      <Header />
      <div className="hero">
        <h1 className="hero-header">Find a house and move home.</h1>
        <p className="hero-desc">
          The best offers for you at any point of your journey. A home is
          priceless, let's offer you an opportunity to make one.
        </p>
        <div className="hero-buttons">
            <Link to="#" className="btn hero-btn">Free Trial</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
