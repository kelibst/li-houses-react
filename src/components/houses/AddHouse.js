import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import AddHouseForm from './AddHouseForm'

class AddHouse extends Component {
    constructor(props){
        super(props)

        this.state = {
            show: false,
           
        }

        
    }
    

    render() {
        const handleShow = () => {
            this.setState({
                ...this.state,
                show: true
            })
        }

        const handleClose = () => {
            this.setState({
                ...this.state,
                show: false
            })
        }
        const { house, status } = this.props
        
        return (
            <div>
            <Button variant="transparent" className="btn hero-btn my-2 w-100" onClick={handleShow}>
                {`${status}  House`}
            </Button>
    
            <Modal show={this.state.show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add a new House</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <AddHouseForm close={handleClose} house={house} status={status} />
                </Modal.Body>
                <Modal.Footer>
               
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}
export default AddHouse