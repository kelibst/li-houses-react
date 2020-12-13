/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable  consistent-return */
import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchHouse,
  dropHouse,
  fetchUser,
  addToFav,
  removeFromFav,
  unLoad,
} from '../store/actions/fetchAction';
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
      user_id: 0,
      house_id: 0,
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
    this.setState({
      user_id: currentUser.id,
      house_id,
    });
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
    const { house_id } = match.params;
    const handleDelete = () => {
      unLoad({ loading: true });
      dropHouse(house.id);
      errors && <ErrOrs />;
      !loading && history.push(`/dashboard/${currentUser.username}`);
    };

    const isFav = currentUser.favorites
      && currentUser.favorites.some(fav => {
        if (fav.house_id) {
          return fav.house_id === house.id;
        }
      });
      console.log(isFav, fav, currentUser)

    const addToFavorite = () => {
      this.setState(
        {
          user_id: currentUser.id,
          house_id,
        },
        () => {
          addToFav(this.state);
        },
      );
        
    };

    const rmFromFav = () => {
      removeFromFav(house_id, currentUser.favorites);
      
    };

    const houseDetails = house.body ? (
      <div className="house-content">
        <NavBar />
        <MobileNav />
        <div className="house-details d-flex justify-content-center">
          <div className="card shadow-lg col-sm-8 col-lg-6 d-md-flex p-0">
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
                {!isFav && !fav ? (
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
                ) : (
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
        <Footer />
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
  errors: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  house: PropTypes.shape.isRequired,
  loading: PropTypes.shape.isRequired,
  fav: PropTypes.shape.isRequired,
  username: PropTypes.shape.isRequired,
  addToFav: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
  dropHouse: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchHouse: PropTypes.func.isRequired,
  removeFromFav: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  house: state.data.house,
  errors: state.error.err,
  currentUser: state.data.currentUser,
  loading: state.data.loading,
  fav: state.data.fav,
  loggedIn: state.data.loggedIn,
});

export default connect(mapStateToProps, {
  fetchHouse,
  dropHouse,
  addToFav,
  fetchUser,
  removeFromFav,
  unLoad,
})(HouseDetails);
