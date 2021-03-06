/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchUserFavs, fetchUser } from '../store/actions/userAction';

import ErrOrs from '../components/ErrOrs';
import Loading from '../components/Loading';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFavsLoaded: false,
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const {
      history, errors, fetchUser, fetchUserFavs, currentUser,
    } = this.props;
    const username = localStorage.getItem('username');

    jwt && username && fetchUser(username);

    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }

    currentUser.id && fetchUserFavs(currentUser.id);
  }

  componentDidUpdate() {
    const { favorites, fetchUserFavs, currentUser } = this.props;
    currentUser.id && !favorites.favorites && fetchUserFavs(currentUser.id);
    favorites.favorites && !this.state.userFavsLoaded && this.setState({
      userFavsLoaded: true,
    });
  }

  render() {
    const srcImg = 'https://images.unsplash.com/photo-1575263977165-207a71e8f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9';
    const { favorites, loading, errors } = this.props;
    const favList = !this.state.userFavsLoaded ? (
      <div className="loading">
        {loading && <Loading />}
        {errors && <ErrOrs />}
      </div>
    ) : (
      favorites.favorites.map(fav => (
        <div className="card p-4 fav-card shadow-lg p-o" key={fav.id}>
          <Card.Img
            variant="top"
            src={fav.image ? fav.image : srcImg}
          />

          <div className="house-status">
            <div className="house-state">{fav.status}</div>
            {fav.status === 'available' && (
            <button type="button" className="house-btn btn hero-btn">
              Make an offer
            </button>
            )}
          </div>
          <Card.Body className="mb-5">
            <Card.Title className="text-uppercase font-weight-bolder">
              {fav.name}
            </Card.Title>
            <div className="card-details">
              <p>Location:</p>
              <p>{fav.location}</p>
            </div>
            <div className="card-details">
              <p>Country:</p>
              <p>{fav.country}</p>
            </div>
            <div className="card-details">
              <p>Region:</p>
              <p>{fav.region}</p>
            </div>

            <hr />
            <Link to={`/houses/${fav.id}`} className="btn hero-btn w-100">
              View House
            </Link>
          </Card.Body>

        </div>
      ))
    );
    return (
      <div className="favorites">
        <div className="fav-container">{ favList}</div>
      </div>
    );
  }
}

Favorites.propTypes = {
  errors: PropTypes.any,
  loading: PropTypes.any,
  history: PropTypes.any,
  fetchUser: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
  favorites: PropTypes.any,
  fetchUserFavs: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  loading: state.userData.loading,
  favorites: state.userData.user_favorites,
});

export default connect(mapStateToProps, { fetchUser, fetchUserFavs })(Favorites);
