/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUser } from '../../store/actions/fetchAction';
import AddHouse from '../houses/AddHouse';
import './NavBar.scss';

class NavBar extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const { fetchUser } = this.props;
    const username = localStorage.getItem('username');
    jwt && username && fetchUser(username);
  }

  render() {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');

    const logUserOut = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      window.location.reload(false);
    };
    const { currentUser } = this.props;
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        className="mb-5"
        variant="light"
      >
        <Navbar.Brand href="/" className="font-weight-bolder">
          <span className="brand-icon">
            <Icofont icon="building" />
          </span>
          {' '}
          Li-HOUSES
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {jwt === null && username === null ? (
            <Nav>
              <NavLink to="/signin" className="btn nav-btn pr-2">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="btn nav-btn">
                Sign Up
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <NavLink
                to={`/dashboard/${username}`}
                className="btn nav-btn pr-2"
              >
                Dashboard
              </NavLink>

              <NavDropdown title={currentUser ? currentUser.username : 'Dropdown'} id="basic-nav-dropdown">
                <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="/user/favorites">
                  <Icofont icon="heart" />
                  {' '}
                  Favs
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Messages</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Notifications</NavDropdown.Item>
              </NavDropdown>

              <AddHouse
                status="Add"
                house={{
                  body: {
                    address: '',
                    country: 'Ghana',
                    image: '',
                    location: '',
                    region: 'Volta',
                    status: 'available',
                    user: 1,
                  },
                }}
              />

              <button type="button" className="btn hero-btn cus-btn" onClick={logUserOut}>
                Log Out
              </button>

            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.data.currentUser,
  loading: state.data.loading,
  loggedIn: state.data.loggedIn,
});

export default connect(mapStateToProps, { fetchUser })(NavBar);
