import React from 'react'
import PropTypes from 'prop-types'
import {
  windowStyle,
  whiteWindowStyle,
  windowButtonStyle,
  terminalStyle,
  headerStyle,
  closeButtonStyle,
  minimizeButtonStyle,
  maximizeButtonStyle,
  bodyStyle,
  consoleStyle,
  whiteConsoleStyle,
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

const getWindowStyle = (white) => {
  if (white) {
    return whiteWindowStyle
  }
  return {}
}

const getTerminalStyle = (height) => {
  if (height) {
    return { height }
  }
  return {}
}

const getConsoleStyle = (white) => {
  if (white) {
    return whiteConsoleStyle
  }
  return {}
}

const Terminal = ({ children, white, height }) => {
  return (
    <div style={Object.assign({}, windowStyle, getWindowStyle(white))}>
      <div style={Object.assign({}, terminalStyle, getTerminalStyle(height))}>
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
          <div style={Object.assign({}, consoleStyle, getConsoleStyle(white))}>
            <div style={codeStyle}>{renderLines(children)}</div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

Terminal.propTypes = {
  children: PropTypes.array,
  white: PropTypes.bool,
  height: PropTypes.number,
}

export default Terminal
