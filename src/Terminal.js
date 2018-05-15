import React from 'react'
import PropTypes from 'prop-types'
import {
  windowStyle,
  whiteWindowStyle,
  windowButtonStyle,
  terminalStyle,
  staticTerminalStyle,
  headerStyle,
  closeButtonStyle,
  minimizeButtonStyle,
  maximizeButtonStyle,
  bodyStyle,
  staticBodyStyle,
  consoleStyle,
  staticConsoleStyle,
  whiteConsoleStyle,
  codeStyle,
  promptStyle,
  cursorStyle,
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
  const style = windowStyle
  if (white) {
    return Object.assign({}, style, whiteWindowStyle)
  }
  return style
}

const getTerminalStyle = (code, height) => {
  const style = code ? staticTerminalStyle : terminalStyle
  if (!code && height) {
    return Object.assign({}, style, { height })
  }
  return style
}

const getButtonStyle = (type) => {
  const baseStyle = windowButtonStyle
  let btnStyle
  if (type === 'close') {
    btnStyle = closeButtonStyle
  } else if (type === 'minimize') {
    btnStyle = minimizeButtonStyle
  } else {
    btnStyle = maximizeButtonStyle
  }

  return Object.assign({}, baseStyle, btnStyle)
}

const getBodyStyle = (code) => {
  return code ? staticBodyStyle : bodyStyle
}

const getConsoleStyle = (code, white) => {
  const baseStyle = code ? staticConsoleStyle : consoleStyle
  const colorStyle = white ? whiteConsoleStyle : {}
  return Object.assign({}, baseStyle, colorStyle)
}

const Terminal = ({ children, white, height, code }) => {
  return (
    <div style={getWindowStyle(white)}>
      <div style={getTerminalStyle(code, height)}>
        <div style={headerStyle}>
          <span
            style={getButtonStyle('close')}
          />
          <span
            style={getButtonStyle('minimize')}
          />
          <span
            style={getButtonStyle('maximize')}
          />
        </div>
        <div style={getBodyStyle(code)}>
          <div style={getConsoleStyle(code, white)}>
            {code ? (
              <code style={codeStyle}>
                {children}
              </code>
            ) : (
              <div style={codeStyle}>
                {renderLines(children)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) 
}

Terminal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  white: PropTypes.bool,
  height: PropTypes.number,
  code : PropTypes.bool
}

export default Terminal
