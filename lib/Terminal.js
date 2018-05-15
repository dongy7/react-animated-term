'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cursor = _react2.default.createElement('span', { style: _styles.cursorStyle });
var prompt = _react2.default.createElement(
  'span',
  { style: _styles.promptStyle },
  '$ '
);

var renderLines = function renderLines(lines) {
  return lines.map(function (line) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      { key: line.id },
      line.cmd ? prompt : '',
      line.text,
      line.current ? cursor : '',
      _react2.default.createElement('br', null)
    );
  });
};

var getWindowStyle = function getWindowStyle(white) {
  if (white) {
    return _styles.whiteWindowStyle;
  }
  return {};
};

var getConsoleStyle = function getConsoleStyle(white) {
  if (white) {
    return _styles.whiteConsoleStyle;
  }
  return {};
};

var Terminal = function Terminal(_ref) {
  var children = _ref.children,
      white = _ref.white;

  return _react2.default.createElement(
    'div',
    { style: (0, _assign2.default)({}, _styles.windowStyle, getWindowStyle(white)) },
    _react2.default.createElement(
      'div',
      { style: _styles.terminalStyle },
      _react2.default.createElement(
        'div',
        { style: _styles.headerStyle },
        _react2.default.createElement('span', {
          style: (0, _assign2.default)({}, _styles.windowButtonStyle, _styles.closeButtonStyle)
        }),
        _react2.default.createElement('span', {
          style: (0, _assign2.default)({}, _styles.windowButtonStyle, _styles.minimizeButtonStyle)
        }),
        _react2.default.createElement('span', {
          style: (0, _assign2.default)({}, _styles.windowButtonStyle, _styles.maximizeButtonStyle)
        })
      ),
      _react2.default.createElement(
        'div',
        { style: _styles.bodyStyle },
        _react2.default.createElement(
          'div',
          { style: (0, _assign2.default)({}, _styles.consoleStyle, getConsoleStyle(white)) },
          _react2.default.createElement(
            'div',
            { style: _styles.codeStyle },
            renderLines(children)
          )
        )
      )
    )
  );
};

Terminal.propTypes = {
  children: _propTypes2.default.array,
  white: _propTypes2.default.bool
};

exports.default = Terminal;