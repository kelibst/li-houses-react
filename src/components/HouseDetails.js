import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import Icofont from "react-icofont";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHouse, dropHouse } from "../store/actions/fetchAction";
import AddHouse from "./houses/AddHouse";
import DashSidebar from "./layouts/DashSidebar";
class HouseDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { house_id } = this.props.match.params;
    const { fetchHouse } = this.props;
    fetchHouse(house_id);
  }
  render() {
    const { house, currentUser, dropHouse, errors, loading } = this.props;
        const imgSrc = 'https://images.unsplash.com/photo-1575263977165-207a71e8f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9';
    const handleDelete = () => {
        dropHouse(house.id)
        errors &&  console.log(errors)
        this.props.history.push('/')
    }

    const houseDetails = house.body ? (
      <div className="house-content">
      <DashSidebar />
        <div className="house-details d-flex justify-content-center">
        
   
        <div className="card shadow-lg col-md-8 d-md-flex p-0">
          <Card.Img variant="top" src={house.body && house.body.image ? house.body.image : imgSrc} />
          <Card.Body>
            <Card.Title className="text-uppercase text-center font-weight-bolder">
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
        {
            currentUser && currentUser.id === house.body.user ? (
                <div className="card-actions">
                    <AddHouse status="Update" house={house} />
                    <Button onClick={handleDelete}  className="btn btn-danger">Delete House</Button>
                </div>
                
            ):(
                <p className="text-secondary">You cannot update this house.</p>
            )
        }
            
          </Card.Body>
        </div>
        </div>
      </div>
    ) : loading ? (
      "Loading..."
    ) : (
      "Sorry something went wrong!"
    );
    return <div>{houseDetails}</div>;
  }
}

const mapStateToProps = (state) => ({
  house: state.data.house,
  errors: state.error.err,
  currentUser: state.data.currentUser,
  loading: state.data.loading,
  loggedIn: state.data.loggedIn,
});

export default connect(mapStateToProps, { fetchHouse, dropHouse })(HouseDetails);
