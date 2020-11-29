import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ErrOrs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const setShow = () => {
      this.setState({
        show: false,
      });
    };
    const { show } = this.state;
    const { errors } = this.props;
    return (
      <div>
        <Alert show={show} variant="danger">
          <Alert.Heading>Sorry Something went wrong!</Alert.Heading>
          <div>
            {errors.request && (
              <h6 className="my-5">{errors.request.response}</h6>
            )}
            {errors.response && (
              <h6 className="my-5">{errors.response.data.error}</h6>
            )}
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={setShow} variant="outline-danger">
              close
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
}
ErrOrs.propTypes = {
  errors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.error.err,
});
export default connect(mapStateToProps, null)(ErrOrs);
