import React, { Component} from 'react';
import { connect } from 'react-redux';
import { uploadImage, clearImg } from '../store/actions/fetchAction';
import PropTypes from 'prop-types'
import Icofont from 'react-icofont';
import Loading from '../components/Loading';

class Uploader extends Component {
    componentDidUpdate(){
        const { houseImgUrl } = this.props
        this.state.loading && houseImgUrl.image && this.setState({
            ...this.state,
            loading: false,
        })
        
    }

    state = {
        loading: false,
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
        this.setState({
            ...this.state,
            loading:true
        })
        
        const form = new FormData()
        form.append("image", this.state.image[0])
        const { uploadImage, clearImg } = this.props
        clearImg()
        uploadImage(form)
    }
    render(){
        const { houseImgUrl, status } = this.props
        return (
            <div className="uploader-container">
                <h1 className="uploader-header">{status} Image </h1>
                <form onSubmit={this.onSubmit} className="uploader-form">
                  {!this.state.loading ?  <div className="uploader-input">
                        <input type="file" name="image" onChange={this.onChange}/>
                        <p className="uploader-desc">Click here to update or add an image.</p>
                    <br/>
                   </div> : 
                (<div className="loading">
                    <Loading />
                </div> )}
                    
                  {!this.state.loading &&  <input type="submit" className="btn hero-btn" value={ houseImgUrl.image ? 'Update' : 'Add'} /> } 
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
export default connect(mapStateToProps, { uploadImage, clearImg })(Uploader)
