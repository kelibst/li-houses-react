import React from 'react';
import MobileNav from './MobileNav';
import NavBar from './NavBar';

const Header = () => (
  <div className="header mb-5">
    <NavBar />
    <MobileNav />
  </div>
);

export default Header;
