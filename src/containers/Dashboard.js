import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Icofont from 'react-icofont'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddHouse from '../components/houses/AddHouse'
import {fetchHouses, fetchUser, logCurrentUserOut } from '../store/actions/fetchAction'
import Houses from './Houses';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        const jwt = localStorage.getItem('jwt');
        const { fetchUser, errors } = this.props
       
        const { username } = this.props.match.params;
        jwt && username ? fetchUser(username) : this.props.history.push('/signin');

        if(errors.response){
             errors.response.status === 401 && this.props.history.push('/signin');
        }
       
    }

    componentDidUpdate(){
        fetchHouses()
    }

    render() {
        const {currentUser} = this.props
        const fullName = currentUser.body ? `${currentUser.body.firstName} ${currentUser.body.lastName}` : ""

        const logUserOut = () => {
            localStorage.removeItem('jwt');

            this.props.history.push('/')
        }
        

        return (
            <div className="dashboard bg-white d-flex">
            <Navbar collapseOnSelect expand="false" className="sidebar col-md-3" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand href="/" className="font-weight-bolder"><span className="brand-icon"><Icofont icon="building" /></span> Li-HOUSES</Navbar.Brand>
            
            <Navbar.Collapse id="responsive-navbar-nav" className="sidebar bg-light">
                <Nav className="mt-5">
                <div className="nav-link user-pic">
                
                </div>

                <h6 className="text-dark text-center my-5 font-weight-bolder text-capitalize">{fullName}</h6>
                <Nav.Link href="/user/favorites">Favorites</Nav.Link>
               
                <Nav.Link href="/users">Users</Nav.Link>
                <NavDropdown title="More" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Notifications</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Recent Activities</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Messages</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Mute</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav> 
                <AddHouse />
                <button className="btn hero-btn" onClick={logUserOut}>Log Out</button>
                </Nav>
            </Navbar.Collapse>
            </Navbar>

            <div className="container-fluid">
                <Houses />
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors:  state.error.err,
    currentUser: state.data.currentUser,
    username: state.data.username,
    loggedIn: state.data.loggedIn
});
export default connect(mapStateToProps, { fetchUser, logCurrentUserOut }) (Dashboard)