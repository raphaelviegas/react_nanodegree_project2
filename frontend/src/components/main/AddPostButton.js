import React from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from 'material-icons-react'

export default () => {
  return (
    <div>
      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large cyan darken-4" to="/addPost">
          <MaterialIcon icon="playlist_add" invert />
        </Link>
      </div>
    </div>
  )
}