import React from 'react';
import Icofont from 'react-icofont';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand font-weight-bolder py-5">
        <Icofont icon="building" />
        Li-HOUSES
      </div>
      <div className="footer-address py-3">
        <h6 className="text-secondary">
          Amenuveve Street 56 Ho, Ghana.
          <br />
          Behind the King &apos; s House.
          {' '}
          <br />
          <hr />
          +233546249862
        </h6>
      </div>
    </div>
    <p className="footer-copy pt-4">Li-HOUSES, Int || &copy; 2020</p>
  </footer>
);

export default Footer;
