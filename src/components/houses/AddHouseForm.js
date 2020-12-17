/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrOrs from '../ErrOrs';

import {
  createHouse,
  fetchHouses,
  updateHouse,
  unLoad,
} from '../../store/actions/fetchAction';

class AddHouseForm extends Component {
  constructor(props) {
    super(props);
    const { house, status } = this.props;
    this.state = {
      name: house.name && status === 'Update' ? house.name : '',
      country: 'Ghana',
      address: house.body && status === 'Update' ? house.body.address : '',
      region: 'Volta',
      image: house.body && status === 'Update' ? house.body.image : '',
      location: house.body && status === 'Update' ? house.body.location : '',
      status:
        house.body && status === 'Update' ? house.body.status : 'available',
      user_id: house.body && status === 'Update' ? house.body.user : 0,
    };
  }

  componentDidMount() {
    const { currentUser, history } = this.props;

    currentUser
      ? this.setState({
        ...this.state,
        user_id: currentUser.id,
      })
      : history.push('/signin');
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      const {
        type, close, house, history, loading, status,
      } = this.props;

      if (type === 'create_house' && !loading) {
        house.id && status !== 'Update' && history.push(`/houses/${house.id}`);
        close();
      }
    }
  }

  render() {
    const {
      createHouse,
      house,
      status,
      updateHouse,
      unLoad,
      errors,
      houseImgUrl,
    } = this.props;

    const availability = ['available', 'processing', 'unavailable'];
    const handleChange = e => {
      const { id, value } = e.target;
      this.setState({
        [id]: value,
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      if (status === 'Add') {
        unLoad({ loading: true });
        houseImgUrl.image
          && this.setState(
            {
              ...this.state,
              image: houseImgUrl.image,
            },
            () => {
              createHouse(this.state);
            },
          );
      } else if (status === 'Update') {
        unLoad({ loading: true });

        if (houseImgUrl.image) {
          this.setState(
            {
              ...this.state,
              image: houseImgUrl.image,
            },
            () => {
              updateHouse(this.state, house.id);
            },
          );
        } else {
          updateHouse(this.state, house.id);
        }
      }
    };

    const { name, address, location } = this.state;
    const { status: stateUs } = this.state;

    return (
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {errors && <ErrOrs />}
          <Form.Group controlId="name" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter a unique House name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="address" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter house address"
              value={address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter house location"
              value={location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Select a House Status</Form.Label>
            <Form.Control as="select" value={stateUs} onChange={handleChange}>
              {availability.map(hstate => (
                <option key={hstate}>{hstate}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="btn hero-btn w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

AddHouseForm.propTypes = {
  errors: PropTypes.any,
  unLoad: PropTypes.any,
  houseImgUrl: PropTypes.any,
  loading: PropTypes.any,
  status: PropTypes.string.isRequired,
  currentUser: PropTypes.any,
  updateHouse: PropTypes.any,
  house: PropTypes.any,
  createHouse: PropTypes.any,
  close: PropTypes.func.isRequired,
  history: PropTypes.any,
  type: PropTypes.string,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  houseImgUrl: state.data.houseImgUrl,
  currentUser: state.userData.currentUser,
  house: state.data.house,
  loading: state.userData.loading,
  type: state.succMsg.type,
});

const ShowTheLocationWithRouter = withRouter(AddHouseForm);
export default connect(mapStateToProps, {
  createHouse,
  fetchHouses,
  updateHouse,
  unLoad,
})(ShowTheLocationWithRouter);
