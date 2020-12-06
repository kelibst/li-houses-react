/* eslint-disable no-unused-expressions */
/* eslint-disable   react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage, clearImg } from '../store/actions/fetchAction';
import Loading from '../components/Loading';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: {},
    };
  }

  componentDidUpdate() {
    const { houseImgUrl } = this.props;
    const { loading } = this.state;
    loading
      && houseImgUrl.image
      && this.setState({
        ...this.state,
        loading: false,
      });
  }

  onChange = e => {
    e.preventDefault();
    e.persist();
    this.setState({
      image: e.target.files,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      loading: true,
    });
    const { image } = this.state;

    const form = new FormData();
    form.append('image', image[0]);
    const { uploadImage, clearImg } = this.props;
    clearImg();
    uploadImage(form);
  };

  render() {
    const { houseImgUrl, status } = this.props;
    const { loading } = this.state;
    return (
      <div className="uploader-container">
        <h1 className="uploader-header">
          {status}
          {' '}
          Image
          {' '}
        </h1>
        <form onSubmit={this.onSubmit} className="uploader-form">
          {!loading ? (
            <div className="uploader-input">
              <input type="file" name="image" onChange={this.onChange} />
              <p className="uploader-desc">
                Click here to update or add an image.
              </p>
              <br />
            </div>
          ) : (
            <div className="loading">
              <Loading />
            </div>
          )}

          {!loading && (
            <input
              type="submit"
              className="btn hero-btn"
              value={houseImgUrl.image ? 'Update' : 'Add'}
            />
          )}
        </form>
        {houseImgUrl.image && (
          <div className="uploaded">
            <img
              className="uploaded-img"
              src={houseImgUrl.image && houseImgUrl.image}
              alt={houseImgUrl.image}
            />
          </div>
        )}
      </div>
    );
  }
}
Uploader.propTypes = {
  houseImgUrl: PropTypes.shape.isRequired,
  uploadImage: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  clearImg: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  houseImgUrl: state.data.houseImgUrl,
});
export default connect(mapStateToProps, { uploadImage, clearImg })(Uploader);
