import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Icofont from 'react-icofont'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'


const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/" className="font-weight-bolder"><span className="brand-icon"><Icofont icon="building" /></span> Li-HOUSES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <NavLink to="/signin" className="btn nav-btn pr-2">Sign In</NavLink>
            <NavLink to="/signup" className="btn nav-btn">Sign Up</NavLink>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
