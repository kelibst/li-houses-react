import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authUser, fetchUser } from '../../store/actions/fetchAction'
import SignUp from './SignUp';

class SignIn extends Component {
    
   constructor(props) {
       super(props)
       this.state = {
            username: '',
            email: '',
            password: '',
       }
   }
   componentDidUpdate(){
    const { loggedIn, errors, username } = this.props
    const jwt = localStorage.getItem('jwt')
    jwt && username && fetchUser(username)
    jwt && loggedIn && this.props.history.push(`/dashboard/${username}`)
    errors && console.log(errors)
   }

    render() { 
        const handleChange = (e) => {
            const { id, value } = e.target
            this.setState({
                [id]: value
            })
        
        }
        const { authUser, username, loggedIn, errors } = this.props
        const handleSubmit = (e) => {
            e.preventDefault()
            authUser(this.state)
      
            username && loggedIn && this.props.history.push(`/dashboard/${username}`)
            errors && console.log(errors)
        }
        return (
            <div className="container-lg auth">
            <div className="auth-header-container">
                <h1 className="auth-header py-5 text-center font-weight-bolder">Sign In</h1>
                <p className="auth-desc pb-5 font-weight-bolder">
                    Hey! Log In to manager your account.
                </p>
            </div>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="username" className="pb-3">
                <Form.Control 
                    required
                    type="username" 
                    placeholder="Enter username" 
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
                        We'll never share your email with anyone else.
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

                <Button  className="btn hero-btn w-100" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors:  state.error.err,
    username: state.data.username,
    loggedIn: state.data.loggedIn
  });

export default  connect(mapStateToProps, { authUser }) (SignIn)