import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HouseLists = (props) => {
    const { house, errors } = props

    const houseDetails = house ? (
        <div className="card shadow-large p-0">
        <Card.Img variant="top" src={house.body.image} />
        <Card.Body>
        <Card.Title className='text-uppercase font-weight-bolder'>{ house.name }</Card.Title>
        <div className="card-details">
            <p>Location:</p><p>{house.body.location}</p>
        </div>
        <div className="card-details">
            <p>Country:</p><p>{house.body.country}</p>
        </div>
        <div className="card-details">
            <p>Region:</p><p>{house.body.region}</p>
        </div>
           
        <hr/>
        <Link to={`/houses/${house.id}`} className="btn hero-btn w-100">View House</Link> 
        </Card.Body>
        </div>
    ) : (
        errors ? "there is an error" : "Loading"
    )
    return (
        houseDetails
    )
}

export default HouseLists
