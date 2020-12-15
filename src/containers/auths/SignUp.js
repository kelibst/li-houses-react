/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrOrs from '../../components/ErrOrs';
import {
  unLoad,
} from '../../store/actions/fetchAction';
import {
  createUser,
  authUser,
  fetchUser,
} from '../../store/actions/userAction';
import Loading from '../../components/Loading';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      userData: {
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        password_confirmation: '',
      },
    };
  }

  componentDidMount() {
    const {
      loggedIn, username, history, fetchUser,
    } = this.props;
    const jwt = localStorage.getItem('jwt');
    jwt && username && fetchUser(username);
    jwt && loggedIn && history.push(`/dashboard/${username}`);
  }

  componentDidUpdate() {
    const { history, currentUser } = this.props;
    const { userData } = this.state;
    currentUser.id && history.push(`/dashboard/${userData.username}`);
  }

  render() {
    const handleChange = e => {
      const { userData } = this.state;
      const { id, value } = e.target;
      this.setState({
        ...this.state,
        userData: {
          ...userData,
          [id]: value,
        },
      });
    };
    const {
      createUser,
      currentUser,
      loggedIn,
      authUser,
      errors,
      history,
      unLoad,
    } = this.props;
    const { isSubmit } = this.state;

    const handleSubmit = e => {
      e.preventDefault();
      const { userData } = this.state;
      this.setState({ isSubmit: true });
      createUser(userData);
      unLoad({ loading: true });
      if (currentUser.id) {
        const { email, password } = userData;
        const data = {
          email,
          password,
        };
        authUser(data);
        history.push(`/dashboard/${currentUser.username}`);
      }
      loggedIn
        && this.setState({
          userData: {
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            password_confirmation: '',
          },
        });
    };

    return (
      <div className="signup auth">
        {isSubmit && (
          <div className="loading">
            <Loading />
          </div>
        )}
        {errors && (
          <div className="loading">
            <ErrOrs />
          </div>
        )}
        <h1 className="display-6 mb-3  font-weight-bolder text-center">
          Sign Up
        </h1>
        <Form
          className="user-form p-5 mb-2 shadow-lg bg-white"
          onSubmit={handleSubmit}
        >
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
          <p className="text-center mt-3 font-weight-bolder auth-text">OR</p>

          <a href="/signin" className="my-3 text-center w-100 btn-link">
            {' '}
            Log In
          </a>
        </Form>
      </div>
    );
  }
}
SignUp.propTypes = {
  currentUser: PropTypes.any,
  errors: PropTypes.any,
  loggedIn: PropTypes.any,
  createUser: PropTypes.func.isRequired,
  username: PropTypes.any,
  authUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
  history: PropTypes.any,
};
const mapStateToProps = state => ({
  loading: state.userData.loading,
  errors: state.error.err,
  loggedIn: state.userData.loggedIn,
  currentUser: state.userData.currentUser,
});
export default connect(mapStateToProps, {
  createUser,
  authUser,
  fetchUser,
  unLoad,
})(SignUp);
