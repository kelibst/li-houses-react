import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Icofont from 'react-icofont'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchUser } from '../../store/actions/fetchAction'
import AddHouse from '../houses/AddHouse'
import './NavBar.scss'


class NavBar extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        jwt && username && fetchUser(username)
    }
    
    render(){
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        const { currentUser } = this.props

        const logUserOut = () => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username')
            window.location.reload(false)
        }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" className="mb-5" variant="light">
        <Navbar.Brand href="/" className="font-weight-bolder"><span className="brand-icon"><Icofont icon="building" /></span> Li-HOUSES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
           
            {jwt === null && username ===null ? ( 
                <Nav>
                <NavLink to="/signin" className="btn nav-btn pr-2">Sign In</NavLink>
                <NavLink to="/signup" className="btn nav-btn">Sign Up</NavLink> 
                </Nav>
            ):(
                <Nav>
                    <NavLink to={`/dashboard/${username}`} className="btn nav-btn pr-2">Dashboard</NavLink>
                    <NavLink to={`/users`} className="btn nav-btn pr-2">Users</NavLink>
                    <AddHouse status="Add" house={{}} />
                    <button className="btn hero-btn" onClick={logUserOut}>Log Out</button>

                </Nav>
            )}
           
           
        </Navbar.Collapse>
        </Navbar>
    )
}
}
const mapStateToProps = (state) => ({
    errors: state.error.err,
    currentUser: state.data.currentUser,
    loading: state.data.loading,
    loggedIn: state.data.loggedIn,
  });

export default connect(mapStateToProps, { fetchUser })(NavBar)
