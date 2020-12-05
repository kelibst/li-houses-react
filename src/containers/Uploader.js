import React, { Component} from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../store/actions/fetchAction';
import PropTypes from 'prop-types'
import Icofont from 'react-icofont';

class Uploader extends Component {

    state = {
        image: {},
    }

    onChange = (e) => {
        e.preventDefault()
        e.persist()
        this.setState({
            image: e.target.files
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("image", this.state.image[0])
        const { uploadImage } = this.props

        uploadImage(form)
    }
    render(){
        const { houseImgUrl, status, house } = this.props
        return (
            <div className="uploader-container">
                <h1 className="uploader-header">{status} Image </h1>
                <form onSubmit={this.onSubmit} className="uploader-form">
                   <div className="uploader-input">
                        <input type="file" name="image" onChange={this.onChange}/>
                        <Icofont icon='upload-alt' className="uploader-btn" />
                    <br/>
                   </div>
                    
                    <input type="submit" className="btn hero-btn" />
                </form>
                {houseImgUrl.image  &&  
                    <div className="uploaded">
                        <img className="uploaded-img" src={houseImgUrl.image && houseImgUrl.image } alt={houseImgUrl.image}/>
                    </div>}
               
            </div>
        )
    }
}
Uploader.propTypes = {
    houseImgUrl: PropTypes.shape.isRequired,
    house: PropTypes.shape.isRequired
}
const mapStateToProps = state => ({
    houseImgUrl: state.data.houseImgUrl,
    house: state.data.house
});
export default connect(mapStateToProps, { uploadImage })(Uploader)
