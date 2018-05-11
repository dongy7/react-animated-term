import React from 'react';
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
      null,
      line.cmd ? prompt : '',
      line.text,
      line.current ? cursor : '',
      React.createElement('br', null)
    );
  });
};

export default (function (_ref) {
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
});