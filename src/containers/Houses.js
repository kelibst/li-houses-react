import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchHouses } from '../store/actions/fetchAction'

class Houses extends Component {
    componentDidMount(){
        const {fetchHouses} = this.props
        fetchHouses()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    houses: state.data.houses,
  });
export default connect(mapStateToProps, { fetchHouses })(Houses)
