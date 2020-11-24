import React from 'react'

const HouseLists = (props) => {
    const { house, errors } = props
    const houseDetails = house ? (
        <div className="card p-0 border-0">
            {house.name}
        </div>
    ) : (
        errors ? "there is an error" : "Loading"
    )
    return (
        houseDetails
    )
}

export default HouseLists
