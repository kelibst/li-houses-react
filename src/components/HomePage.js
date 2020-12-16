import React from 'react';
import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import './HomePage.scss';

import Footer from './layouts/Footer';
import ilus1 from '../assets/ilus1.svg';
import ilus2 from '../assets/ilus2.svg';

const HomePage = () => (
  <div className="content">
    <Header />
    <div className="hero">
      <h1 className="hero-header">Find a house and move home.</h1>
      <p className="hero-desc">
        The best offers for you at any point of your journey. A home is
        priceless, let &apos; s offer you an opportunity to make one.
      </p>
      <div className="hero-buttons">
        <Link to="/signin" className="btn shadow-lg hero-btn">
          Free Trial
        </Link>
      </div>
    </div>
    <section className="some py-5 container">
      <h5 className=" my-4 some-header text-center text-uppercase text-secondary">
        The simplest way to rent.
      </h5>
      <h3 className="some-header py-3 text-center text-secondary">
        Comfortable Rooms from Reliable People.
      </h3>
      <div className="some-one d-sm-flex">
        <div className="col-md-4">
          <h4 className="text-center py-4">All at your fingertip</h4>
          <p className="some-content py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            natus nostrum rem provident eligendi tempore, omnis saepe, quidem
            consectetur perspiciatis nulla et dicta, rerum laboriosam excepturi
            ea assumenda. Provident repellendus blanditiis eos modi, neque
            laboriosam, recusandae quibusdam, porro laudantium architecto dicta
            rem at praesentium explicabo natus sequi tenetur nobis aliquam.
          </p>

          <a href="/sigin" className="btn shadow-lg hero-btn">
            Learn More
          </a>
        </div>
        <div className="row">
          <img src={ilus1} className="ilus" alt="illustration" />
        </div>
      </div>
    </section>

    <section className="some bg-light my-5 py-5">
      <h5 className=" py-4 some-header text-center text-uppercase text-secondary">
        The simplest way to rent.
      </h5>
      <h3 className="some-header py-3 text-center text-secondary">
        Comfortable Rooms from Reliable People.
      </h3>
      <div className="some-two d-sm-flex container">
        <div className="col-md-4">
          <h4 className="text-center py-4">All at your fingertip</h4>
          <p className="some-content py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            natus nostrum rem provident eligendi tempore, omnis saepe, quidem
            consectetur perspiciatis nulla et dicta, rerum laboriosam excepturi
            ea assumenda. Provident repellendus blanditiis eos modi, neque
            laboriosam, recusandae quibusdam, porro laudantium architecto dicta
            rem at praesentium explicabo natus sequi tenetur nobis aliquam.
          </p>

          <a href="/signin" className="btn shadow-lg hero-btn">
            Learn More
          </a>
        </div>

        <div className="row">
          <img src={ilus2} className="ilus" alt="illustration 2" />
        </div>
      </div>
    </section>

    <section className="pre-footer text-light">
      <h5 className="text-center font-weight-bolder text-uppercase mb-4">
        Welcome to a Serene Home!
      </h5>
      <Link to="/#" className="btn hero-btn shadow-lg">
        {' '}
        Free Trial
      </Link>
    </section>
  </div>
);

export default HomePage;
