import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddHouseForm from './AddHouseForm';
import Uploader from '../../containers/Uploader';

class AddHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    const handleShow = () => {
      this.setState({
        show: true,
      });
    };

    const handleClose = () => {
      this.setState({
        show: false,
      });
    };
    const { house, status } = this.props;
    const { show } = this.state;

    return (
      <div>
        <Button
          variant="transparent"
          className="btn hero-btn cus-btn w-100"
          onClick={handleShow}
        >
          {`${status}  House`}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new House</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Uploader status={status}/>
            <AddHouseForm
              close={handleClose}
              house={house}
              status={status}
            />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      
      </div>
    );
  }
}
AddHouse.propTypes = {
  house: PropTypes.shape.isRequired,
  status: PropTypes.shape.isRequired,
};
export default AddHouse;
