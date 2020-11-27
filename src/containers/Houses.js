import React, { Component } from 'react'
import { connect } from 'react-redux';
import HouseLists from '../components/HouseLists';
import { fetchHouses } from '../store/actions/fetchAction'

class Houses extends Component {
    componentDidMount(){
        const { fetchHouses } = this.props
        fetchHouses()
    }
    render() {
        const {houses, errors, loading } = this.props
        const housesLoad = houses.length ? (
            <div className="container-xl">
                <div className="house-container my-4 py-3">
                    { houses && houses.map(house => <HouseLists house={house} key={house.id} errors={ errors }/>)}
                </div>
            </div>
            
        ) : (
            loading ? "loading" : "There was an error" 
        )


        return housesLoad
    }
}
const mapStateToProps = state => ({
    houses: state.data.houses,
    loading: state.data.loading,
    errors:  state.error.err,
    house: state.data.house
  });
export default connect(mapStateToProps, { fetchHouses })(Houses)
