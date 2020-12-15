/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/layouts/Footer';
import NavBar from '../components/layouts/NavBar';

import { fetchHouses } from '../store/actions/fetchAction';
import { fetchUser, logCurrentUserOut } from '../store/actions/userAction';
import Houses from './Houses';
import MobileNav from '../components/layouts/MobileNav';

class Dashboard extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const {
      fetchUser, errors, history, match, currentUser,
    } = this.props;

    const { username } = match.params;
    jwt && username && !currentUser.id && fetchUser(username);

    !jwt && !currentUser.id && history.push('/signin');
    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  componentDidUpdate() {
    const jwt = localStorage.getItem('jwt');

    const { errors, history, currentUser } = this.props;
    !jwt && !currentUser.id && history.push('/signin');
    fetchHouses();
    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  render() {
    return (
      <div className="dashboard bg-white">
        <NavBar />
        <MobileNav />
        <div className="container-fluid card-list">
          <Switch>
            <Route exact path="/dashboard/:username" component={Houses} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  errors: PropTypes.any,
  match: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.any,
  username: PropTypes.string,
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  username: state.userData.username,
  loggedIn: state.userData.loggedIn,
});
export default connect(mapStateToProps, { fetchUser, logCurrentUserOut })(
  Dashboard,
);
