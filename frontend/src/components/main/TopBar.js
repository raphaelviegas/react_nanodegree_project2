import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper cyan darken-3">
                    <span className="brand-logo"><Link to="/">Leituras</Link></span>
                </div>
            </nav>
        </div>
    )
}
