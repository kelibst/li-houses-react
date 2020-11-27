import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createHouse, fetchHouses } from '../../store/actions/fetchAction'

class AddHouseForm extends Component {
    constructor(props){
        super(props)
        this.state= {
            name: "",
            country: "Ghana",
            address: "",
            region: "Volta",
            location: "",
            status: "available",
            user_id: 0
        }
    }

    componentDidMount(){
        const { currentUser } = this.props
        currentUser ? this.setState({
            ...this.state,
            user_id: currentUser.id
        }) :
        (<Redirect to="/signin" />)
    }
    
    render() {
    const availability = ['available', 'processing', 'unavailable']
        const handleChange = (e) => {
            const { id, value } = e.target
            this.setState({
                [id]: value
            })
        
        }
        
        const handleSubmit = (e) => {
            const { createHouse, house, fetchHouses, close } = this.props
            e.preventDefault()
            createHouse(this.state)
            house && close()
            window.location.reload(false)
        }

        return (
            <Form onSubmit={handleSubmit}>

            <Form.Group controlId="name" className="pb-3">
            <Form.Control 
                required
                type="text" 
                placeholder="Enter a unique House name" 
                onChange={handleChange}
                />
            </Form.Group>

            
            <Form.Group controlId="address" className="pb-3">
            <Form.Control 
                required
                type="text" 
                placeholder="Enter house address" 
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="location" className="pb-3">
            <Form.Control 
                required
                type="text" 
                placeholder="Enter house location" 
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="image" className="pb-3">
            <Form.Control 
                required
                type="text" 
                placeholder="Enter link to the house image" 
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="status">
            <Form.Label>Select a House Status</Form.Label>
            <Form.Control
              as="select"
            //   value={hospital.country}
              onChange={handleChange}
            >
              {availability.map((hstate) => (
                <option key={hstate}>{hstate}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button  className="btn hero-btn w-100" type="submit">
          Submit
            </Button>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    errors:  state.error.err,
    currentUser: state.data.currentUser,
    house: state.data.house,
    loading: state.data.loading
  });
export default connect(mapStateToProps, { createHouse, fetchHouses }) (AddHouseForm)