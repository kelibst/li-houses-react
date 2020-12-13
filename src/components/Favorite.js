import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchHouse } from '../store/actions/fetchAction';

class Favorite extends Component {
  

  render() {
    const { house } = this.props;
    debugger
    return (
      <div className="fav">
        {house.name}
      </div>
    );
  }
}

Favorite.propTypes = {
  house: PropTypes.shape.isRequired,
  fetchHouse: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.data.currentUser,
  house: state.data.house,
});

export default connect(mapStateToProps, { fetchHouse })(Favorite);
