/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/layouts/Footer';
import NavBar from '../components/layouts/NavBar';

import {
  fetchHouses,
  fetchUser,
  logCurrentUserOut,
} from '../store/actions/fetchAction';
import Houses from './Houses';
import MobileNav from '../components/layouts/MobileNav';

class Dashboard extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const {
      fetchUser, errors, history, match,
    } = this.props;

    const { username } = match.params;
    jwt && username ? fetchUser(username) : history.push('/signin');

    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  componentDidUpdate() {
    fetchHouses();
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
  errors: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  username: PropTypes.string.isRequired,
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.data.currentUser,
  username: state.data.username,
  loggedIn: state.data.loggedIn,
});
export default connect(mapStateToProps, { fetchUser, logCurrentUserOut })(
  Dashboard,
);
