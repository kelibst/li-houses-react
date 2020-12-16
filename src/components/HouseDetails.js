/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable  consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable  eqeqeq */
import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchHouse,
  dropHouse,
  addToFav,
  removeFromFav,
  unLoad,
  isFav,
} from '../store/actions/fetchAction';
import { fetchUser } from '../store/actions/userAction';
import ErrOrs from './ErrOrs';
import AddHouse from './houses/AddHouse';
import Footer from './layouts/Footer';
import NavBar from './layouts/NavBar';
import Loading from './Loading';
import MobileNav from './layouts/MobileNav';

class HouseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      favorite_data: {
        user_id: 0,
        house_id: 0,
      },
    };
  }

  componentDidMount() {
    const {
      fetchHouse, fetchUser, currentUser, match,
    } = this.props;
    const { house_id } = match.params;

    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    jwt && username && fetchUser(username);
    fetchHouse(house_id);
    const { favorite_data } = this.state;

    this.setState({
      ...this.state,
      favorite_data: {
        ...favorite_data,
        user_id: currentUser.id,
        house_id,
      },
    });
  }

  componentDidUpdate(nextProps) {
    const {
      currentUser, match, isFav, fav,
    } = this.props;
    const { id, favorites } = currentUser;
    const { house_id } = match.params;
    let favorite = false;
    if (favorites !== nextProps.currentUser.favorites) {
      if (id && !fav) {
        favorite = favorites.some(
          fav => fav.house_id == house_id,
        );
        favorite && isFav();
      }
    }
  }

  render() {
    const {
      house,
      currentUser,
      dropHouse,
      errors,
      loading,
      addToFav,
      fav,
      history,
      match,
      unLoad,
      removeFromFav,
    } = this.props;
    const { favorite_data } = this.state;
    const { house_id } = match.params;
    const handleDelete = () => {
      unLoad({ loading: true });
      dropHouse(house.id);
      errors && <ErrOrs />;
      !loading && history.push(`/dashboard/${currentUser.username}`);
    };

    const addToFavorite = () => {
      this.setState(
        {
          ...this.state,
          favorite_data: {
            ...favorite_data,
            user_id: currentUser.id,
            house_id,
          },
        },
        () => {
          addToFav(favorite_data, currentUser);
        },
      );
    };

    const rmFromFav = () => {
      removeFromFav(house_id, currentUser);
    };

    const houseDetails = house.body ? (
      <div className="house-content">
        <div className="house-details d-flex justify-content-center">
          <div className="card shadow-lg col-sm-8 col-lg-6 col-xl-4 d-md-flex p-0">
            <Card.Img variant="top" src={house.body.image} />
            {house.body && (
              <div className="house-status">
                <div className="house-state">{house.body.status}</div>
                {house.body.status === 'available' && (
                  <button type="button" className="house-btn btn hero-btn">
                    Make an offer
                  </button>
                )}
              </div>
            )}
            <Card.Body>
              <Card.Title className="text-uppercase text-center font-weight-bolder">
                {house.name}
                {' '}
                {fav ? (
                  <button
                    type="button"
                    onClick={rmFromFav}
                    className=" btn btn-transparent hero-btn"
                  >
                    <Icofont icon="heart-alt" />
                    {' '}
                    Remove from Favorites
                    {' '}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={addToFavorite}
                    className=" btn btn-transparent hero-btn"
                  >
                    <Icofont icon="heart" />
                    {' '}
                    Add to Favorites
                    {' '}
                  </button>
                )}
              </Card.Title>
              <div className="card-details">
                <p>Location:</p>
                <p>{house.body.location}</p>
              </div>
              <div className="card-details">
                <p>Country:</p>
                <p>{house.body.country}</p>
              </div>
              <div className="card-details">
                <p>Region:</p>
                <p>{house.body.region}</p>
              </div>
              <hr />
              {currentUser && currentUser.id === house.body.user ? (
                <div className="card-actions">
                  <AddHouse status="Update" house={house} />
                  <Button onClick={handleDelete} className="btn btn-danger">
                    Delete House
                  </Button>
                </div>
              ) : (
                <p className="text-secondary">You cannot update this house.</p>
              )}
            </Card.Body>
          </div>
        </div>
      </div>
    ) : (
      <div className="loading">
        {loading && <Loading />}
        {errors && <ErrOrs />}
      </div>
    );
    return <div>{houseDetails}</div>;
  }
}

HouseDetails.propTypes = {
  errors: PropTypes.any,
  match: PropTypes.any,
  house: PropTypes.any,
  loading: PropTypes.any,
  fav: PropTypes.any,
  username: PropTypes.any,
  addToFav: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
  dropHouse: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchHouse: PropTypes.func.isRequired,
  removeFromFav: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
  isFav: PropTypes.func.isRequired,
  history: PropTypes.any,
};

const mapStateToProps = state => ({
  house: state.data.house,
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  loading: state.data.loading,
  fav: state.data.fav,
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps, {
  fetchHouse,
  dropHouse,
  addToFav,
  fetchUser,
  removeFromFav,
  unLoad,
  isFav,
})(HouseDetails);
