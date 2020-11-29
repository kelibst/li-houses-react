import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const HouseLists = (props) => {
  const { house } = props;
  const srcImg =
    "https://images.unsplash.com/photo-1575263977165-207a71e8f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9";
  const houseDetails = house ? (
    <div className="card shadow-lg p-0">
      <Card.Img
        variant="top"
        src={house.body.image ? house.body.image : srcImg}
      />
      <Card.Body>
        <Card.Title className="text-uppercase font-weight-bolder">
          {house.name}
        </Card.Title>
        <div className="card-details">
          <p>Location:</p>
          <p>{house.body.location}</p>
        </div>
        <div className="card-details">
          <p>Country:</p>
          <p>{house.body.country}</p>
        </div>
        <div className="card-details">
          <p>Region:</p>
          <p>{house.body.region}</p>
        </div>

        <hr />
        <Link to={`/houses/${house.id}`} className="btn hero-btn w-100">
          View House
        </Link>
      </Card.Body>
    </div>
  ) : (
    <div className="loading">{<Loading />}</div>
  );
  return houseDetails;
};

export default HouseLists;
