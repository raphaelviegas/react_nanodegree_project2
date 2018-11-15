import React from 'react'
import { Link } from 'react-router-dom'
import AddPostForm from './AddPostForm'

export default () => {
  return (
    <div className="container center-align">
        <AddPostForm />
        <Link to="/" className="grey-text text-lighten-1 btn-flat back-button">Go back to the home page</Link>
    </div>
  )
}