/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUser } from '../../store/actions/userAction';
import AddHouse from '../houses/AddHouse';

class MobileNav extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const { fetchUser } = this.props;
    const username = localStorage.getItem('username');
    jwt && username && fetchUser(username);
  }

  render() {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const { currentUser, history } = this.props;
    const logUserOut = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      history.push('/signin');
    };

    return (
      <Navbar
        bg="light"
        className="mt-5 d-sm-none"
        fixed="bottom"
        variant="light"
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
          <Nav className="mobile ">
            <NavLink
              to={`/dashboard/${currentUser.username}`}
              className="btn active active nav-btn pr-2"
            >
              <Icofont icon="dashboard mobile-icon" />
            </NavLink>
            <NavDropdown
              title={<Icofont icon="user" className="nav-icon mobile-icon" />}
              id="basic-nav-dropdown"
              className="text-center mobile"
            >
              <NavDropdown.Item href={`/dashboard/${currentUser.username}`}>
                {currentUser ? currentUser.username : 'Profile'}
              </NavDropdown.Item>
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
              <NavDropdown.Item href={`/dashboard/${currentUser.username}/favorites`}>
                <Icofont icon="heart" />
                {' '}
                Favs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Messages</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Notifications
              </NavDropdown.Item>

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
              <button
                type="button"
                className="btn hero-btn cus-btn w-100"
                onClick={logUserOut}
              >
                Log Out
              </button>
            </NavDropdown>
          </Nav>
        )}
      </Navbar>
    );
  }
}

MobileNav.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  loading: state.userData.loading,
  loggedIn: state.userData.loggedIn,
});

const ShowTheLocationWithRouter = withRouter(MobileNav);
export default connect(mapStateToProps, { fetchUser })(ShowTheLocationWithRouter);
