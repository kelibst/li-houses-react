/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../store/actions/fetchAction';
import NavBar from '../components/layouts/NavBar';
import Favorite from '../components/Favorite';
import ErrOrs from '../components/ErrOrs';
import Loading from '../components/Loading';
import MobileNav from '../components/layouts/MobileNav';

class Favorites extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const { history, errors, fetchUser } = this.props;
    const username = localStorage.getItem('username');
    jwt && username && fetchUser(username);
    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  render() {
    const { currentUser, loading, errors } = this.props;
    const favList = currentUser.favorites && !loading ? (
      currentUser.favorites.map(fav => (
        <Favorite id={fav.house_id} key={fav.house_id} />
      ))
    ) : (
      <div className="loading">
        {loading && <Loading />}
        {errors && <ErrOrs />}
      </div>
    );
    return (
      <div className="favorites">
        <NavBar />
        <MobileNav />
        <div className="fav-container">{favList}</div>
      </div>
    );
  }
}

Favorites.propTypes = {
  errors: PropTypes.shape.isRequired,
  loading: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired,
  fetchUser: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.data.currentUser,
  loading: state.data.loading,
});

export default connect(mapStateToProps, { fetchUser })(Favorites);
