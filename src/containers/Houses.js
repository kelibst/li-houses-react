import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrOrs from '../components/ErrOrs';
import HouseLists from '../components/HouseLists';
import Loading from '../components/Loading';
import { fetchHouses } from '../store/actions/fetchAction';

class Houses extends Component {
  componentDidMount() {
    const { fetchHouses } = this.props;
    fetchHouses();
  }

  render() {
    const { houses, errors, loading } = this.props;

    const housesLoad = houses.length ? (
      <div className="container-xl">
        <div className="house-container my-4 py-3">
          {houses
            && houses.map(house => (
              <HouseLists house={house} key={house.id} errors={errors} />
            ))}
        </div>
      </div>
    ) : (
      <div className="loading">
        {loading && <Loading />}
        {errors && <ErrOrs />}
      </div>
    );

    return housesLoad;
  }
}

Houses.propTypes = {
  errors: PropTypes.any,
  houses: PropTypes.any,
  loading: PropTypes.any,
  fetchHouses: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  houses: state.data.houses,
  loading: state.data.loading,
  errors: state.error.err,
  house: state.data.house,
});
export default connect(mapStateToProps, { fetchHouses })(Houses);
