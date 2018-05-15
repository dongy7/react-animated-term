import React from 'react'
import PropTypes from 'prop-types'
import Terminal from './Terminal'

const Code = ({ children, ...rest }) => {
  return (
    <Terminal {...rest} code>
      {children}
    </Terminal>
  )
}

Code.propTypes = {
  children: PropTypes.string
}

export default Code