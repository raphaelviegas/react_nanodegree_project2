import React from 'react'
import PropTypes from 'prop-types'
import SwitchRoutes from './SwitchRoutes'

const Dynamic = (props) => {
  return (
    <div>
      {props.loading === true
        ? <div className="progress"><div className="indeterminate"></div></div>
        : <div className="section"><SwitchRoutes /></div>
      }
    </div>
  )
}

Dynamic.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Dynamic