/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrOrs from '../../components/ErrOrs';
import { createUser, authUser } from '../../store/actions/fetchAction';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      firstname: '',
      lastname: '',
      password_confirmation: '',
    };
  }

  render() {
    const handleChange = e => {
      const { id, value } = e.target;
      this.setState({
        [id]: value,
      });
    };
    const {
      createUser,
      currentUser,
      loggedIn,
      authUser,
      errors,
      history,
    } = this.props;
    const handleSubmit = e => {
      e.preventDefault();
      createUser(this.state);
      if (currentUser.id) {
        const { email, password } = this.state;
        const data = {
          email,
          password,
        };
        authUser(data);
        history.push('/');
      }
      loggedIn
        && this.setState({
          email: '',
          password: '',
          username: '',
          firstname: '',
          lastname: '',
          password_confirmation: '',
        });

      errors && <ErrOrs />;
    };

    return (
      <div className="container-lg auth">
        <h1 className="display-6 py-5 font-weight-bolder text-center">
          Sign Up
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstname">
            <Form.Control
              required
              type="text"
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Control
              required
              type="text"
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Control
              required
              type="text"
              placeholder="Enter your unique username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password_confirmation">
            <Form.Control
              required
              type="password"
              placeholder="confirm you password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="btn hero-btn w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
SignUp.propTypes = {
  currentUser: PropTypes.shape.isRequired,
  errors: PropTypes.shape.isRequired,
  loggedIn: PropTypes.shape.isRequired,
  createUser: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  errors: state.error.err,
  loggedIn: state.data.loggedIn,
  currentUser: state.data.currentUser,
});
export default connect(mapStateToProps, { createUser, authUser })(SignUp);
