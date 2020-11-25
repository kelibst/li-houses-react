import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchHouse } from '../store/actions/fetchAction'
class HouseDetails extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { house_id } = this.props.match.params;
        const { loggedIn } = this.props
        console.log(this.props)
        loggedIn && fetchHouse(house_id) 
    }
    render() {
       const { house, errors } = this.props
        return (
            <div>
                {house.name}
                {errors && console.log(errors)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    house: state.data.house,
    errors:  state.error.err,
    loggedIn: state.data.loggedIn
  });

export default connect(mapStateToProps, { fetchHouse })(HouseDetails)

