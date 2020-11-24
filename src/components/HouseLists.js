import React from 'react'
import { Link } from 'react-router-dom'

const HouseLists = (props) => {
    const { house, errors } = props
    const houseDetails = house ? (
        <div className="card p-0 border-0">
            { house.name }
            <Link to={`houses/${house.id}`} className="btn btn-primary">View House</Link> 
        </div>
    ) : (
        errors ? "there is an error" : "Loading"
    )
    return (
        houseDetails
    )
}

export default HouseLists
