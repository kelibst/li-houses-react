import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            this is the header
            <Link to="/signin" className="btn btn-primary">Sign In</Link>
        </div>
    )
}

export default Header
