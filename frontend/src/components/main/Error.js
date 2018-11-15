import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="container center-align error-page">
      <h3 className="error-title">Ops, something went wrong!</h3>
      <p className="error-text">This page doesn't exist</p>
      <Link to="/" className="error-link waves-effect waves-light btn">Go back to the home page</Link>
    </div>
  )
}
