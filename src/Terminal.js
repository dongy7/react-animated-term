import React from 'react'
import PropTypes from 'prop-types'
import {
  windowStyle,
  windowButtonStyle,
  terminalStyle,
  headerStyle,
  closeButtonStyle,
  minimizeButtonStyle,
  maximizeButtonStyle,
  bodyStyle,
  consoleStyle,
  codeStyle,
  promptStyle,
  cursorStyle
} from './styles'

const cursor = <span style={cursorStyle} />
const prompt = <span style={promptStyle}>$ </span>

const renderLines = lines => {
  return lines.map(line => {
    return (
      <React.Fragment key={line.id}>
        {line.cmd ? prompt : ''}
        {line.text}
        {line.current ? cursor : ''}
        <br />
      </React.Fragment>
    )
  })
}

const Terminal = ({ children }) => {
  return (
    <div style={windowStyle}>
      <div style={terminalStyle}>
        <div style={headerStyle}>
          <span
            style={Object.assign({}, windowButtonStyle, closeButtonStyle)}
          />
          <span
            style={Object.assign({}, windowButtonStyle, minimizeButtonStyle)}
          />
          <span
            style={Object.assign({}, windowButtonStyle, maximizeButtonStyle)}
          />
        </div>
        <div style={bodyStyle}>
          <div style={consoleStyle}>
            <div style={codeStyle}>{renderLines(children)}</div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

Terminal.propTypes = {
  children: PropTypes.array
}

export default Terminal
