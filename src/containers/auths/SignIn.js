/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authUser, fetchUser } from '../../store/actions/fetchAction';
import ErrOrs from '../../components/ErrOrs';
import Loading from '../../components/Loading';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      data: {
        username: '',
        email: '',
        password: '',
      },
    };
  }

  componentDidUpdate() {
    const { loggedIn, username, history } = this.props;
    const jwt = localStorage.getItem('jwt');
    jwt && username && fetchUser(username);
    jwt && loggedIn && history.push(`/dashboard/${username}`);
  }

  render() {
    const handleChange = e => {
      const { id, value } = e.target;
      const { data } = this.state;
      this.setState({
        ...this.state,
        data: {
          ...data,
          [id]: value,
        },
      });
    };
    const {
      authUser,
      currentUser,
      loggedIn,
      errors,
      loading,
      history,
    } = this.props;
    const handleSubmit = e => {
      e.preventDefault();
      this.setState({
        isSubmit: true,
      });
      const { data } = this.state;
      authUser(data);
      currentUser
        && loggedIn
        && history.push(`/dashboard/${currentUser.username}`);
    };
    const { isSubmit } = this.state;
    return (
      <div className="signin auth">
        {errors && (
          <div className="loading">
            <ErrOrs />
          </div>
        )}
        {loading && isSubmit && !errors && (
          <div className="loading">
            <Loading />
          </div>
        )}
        <div className="auth-header-container">
          <h1 className="auth-header py-5 text-center font-weight-bolder">
            Sign In
          </h1>
          <p className="auth-desc pb-5 font-weight-bolder">
            Hey! Log In to manager your account.
          </p>
        </div>
        <Form
          className="user-form p-5 shadow-lg bg-white"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="username" className="pb-3">
            <Form.Control
              required
              type="username"
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className="pb-3">
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

          <Form.Group controlId="password" className="pb-5">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="btn hero-btn w-100" type="submit">
            Submit
          </Button>
          <a href="/signup" className="btn my-3 bg-success hero-btn w-100">
            {' '}
            Register
          </a>
        </Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  errors: PropTypes.shape.isRequired,
  loggedIn: PropTypes.shape.isRequired,
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape.isRequired,
  authUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  username: state.data.username,
  loading: state.data.loading,
  currentUser: state.data.currentUser,
  loggedIn: state.data.loggedIn,
});

export default connect(mapStateToProps, { authUser })(SignIn);
