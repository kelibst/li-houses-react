import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authUser } from '../../store/actions/fetchAction'
import SignUp from './SignUp';

class SignIn extends Component {
    
   constructor(props) {
       super(props)
       this.state = {
            email: '',
            password: '',
       }
   }
   componentDidUpdate(){
    const { loggedIn, errors } = this.props
    loggedIn && this.props.history.push('/')
    errors && console.log(errors)
   }

    render() { 
        const handleChange = (e) => {
            const { id, value } = e.target
            this.setState({
                [id]: value
            })
        
        }
        const { authUser, loggedIn, errors } = this.props
        const handleSubmit = (e) => {
            e.preventDefault()
            authUser(this.state)
            loggedIn && this.props.history.push('/')
            errors && console.log(errors)
        }
        return (
            <div className="container-lg">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
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
            
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        placeholder="Password"
                        onChange={handleChange} 
                        />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors:  state.error.err,
    loggedIn: state.data.loggedIn
  });

export default  connect(mapStateToProps, { authUser }) (SignIn)