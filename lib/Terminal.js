import React from 'react';
import PropTypes from 'prop-types';
import { windowStyle, windowButtonStyle, terminalStyle, headerStyle, closeButtonStyle, minimizeButtonStyle, maximizeButtonStyle, bodyStyle, consoleStyle, codeStyle, promptStyle, cursorStyle } from './styles';

var cursor = React.createElement('span', { style: cursorStyle });
var prompt = React.createElement(
  'span',
  { style: promptStyle },
  '$ '
);

var renderLines = function renderLines(lines) {
  return lines.map(function (line) {
    return React.createElement(
      React.Fragment,
      { key: line.id },
      line.cmd ? prompt : '',
      line.text,
      line.current ? cursor : '',
      React.createElement('br', null)
    );
  });
};

var Terminal = function Terminal(_ref) {
  var children = _ref.children;

  return React.createElement(
    'div',
    { style: windowStyle },
    React.createElement(
      'div',
      { style: terminalStyle },
      React.createElement(
        'div',
        { style: headerStyle },
        React.createElement('span', {
          style: Object.assign({}, windowButtonStyle, closeButtonStyle)
        }),
        React.createElement('span', {
          style: Object.assign({}, windowButtonStyle, minimizeButtonStyle)
        }),
        React.createElement('span', {
          style: Object.assign({}, windowButtonStyle, maximizeButtonStyle)
        })
      ),
      React.createElement(
        'div',
        { style: bodyStyle },
        React.createElement(
          'div',
          { style: consoleStyle },
          React.createElement(
            'div',
            { style: codeStyle },
            renderLines(children)
          )
        )
      )
    )
  );
};

Terminal.propTypes = {
  children: PropTypes.array
};

export default Terminal;