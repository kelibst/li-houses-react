import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Switch from 'react-bootstrap/esm/Switch'
import Icofont from 'react-icofont'
import { connect } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import HouseDetails from '../components/HouseDetails'
import HouseLists from '../components/HouseLists'
import AddHouse from '../components/houses/AddHouse'
import DashSidebar from '../components/layouts/DashSidebar'
import Footer from '../components/layouts/Footer'
import NavBar from '../components/layouts/NavBar'
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
            <div className="dashboard bg-white">
            <NavBar />
            <div className="container-fluid card-list">
                <Switch>
                    <Route exact path="/dashboard/:username" component={Houses} />
                    <Route exact path="/houses/:house_id" component={HouseDetails} />
                </Switch>
            </div>
            <Footer />
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