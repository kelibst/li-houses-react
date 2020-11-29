/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  createHouse,
  fetchHouses,
  updateHouse,
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

  render() {
    const {
      createHouse,
      house,
      status,
      loading,
      updateHouse,
      history,
      close,
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
        createHouse(this.state);
        !loading && close();
        !loading && history.push(`/houses/${house.id}`);
      } else if (status === 'Update') {
        updateHouse(this.state, house.id);

        !loading && close();
        !loading && window.location.reload(false);
      }
    };

    const {
      name, address, location, image,
    } = this.state;
    const { status: stateUs } = this.state;

    return (
      <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="image" className="pb-3">
          <Form.Control
            required
            type="text"
            placeholder="Enter link to the house image"
            value={image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Select a House Status</Form.Label>
          <Form.Control
            as="select"
            value={stateUs}
            onChange={handleChange}
          >
            {availability.map(hstate => (
              <option key={hstate}>{hstate}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button className="btn hero-btn w-100" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

AddHouseForm.propTypes = {
  loading: PropTypes.shape.isRequired,
  status: PropTypes.shape.isRequired,
  currentUser: PropTypes.shape.isRequired,
  updateHouse: PropTypes.shape.isRequired,
  house: PropTypes.shape.isRequired,
  createHouse: PropTypes.shape.isRequired,
  close: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  currentUser: state.data.currentUser,
  house: state.data.house,
  loading: state.data.loading,
});

const ShowTheLocationWithRouter = withRouter(AddHouseForm);
export default connect(mapStateToProps, {
  createHouse,
  fetchHouses,
  updateHouse,
})(ShowTheLocationWithRouter);
