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
  var style = _styles.windowStyle;
  if (white) {
    return (0, _assign2.default)({}, style, _styles.whiteWindowStyle);
  }
  return style;
};

var getTerminalStyle = function getTerminalStyle(code, height) {
  var style = code ? _styles.staticTerminalStyle : _styles.terminalStyle;
  if (!code && height) {
    return (0, _assign2.default)({}, style, { height: height });
  }
  return style;
};

var getButtonStyle = function getButtonStyle(type) {
  var baseStyle = _styles.windowButtonStyle;
  var btnStyle = void 0;
  if (type === 'close') {
    btnStyle = _styles.closeButtonStyle;
  } else if (type === 'minimize') {
    btnStyle = _styles.minimizeButtonStyle;
  } else {
    btnStyle = _styles.maximizeButtonStyle;
  }

  return (0, _assign2.default)({}, baseStyle, btnStyle);
};

var getBodyStyle = function getBodyStyle(code) {
  return code ? _styles.staticBodyStyle : _styles.bodyStyle;
};

var getConsoleStyle = function getConsoleStyle(code, white) {
  var baseStyle = code ? _styles.staticConsoleStyle : _styles.consoleStyle;
  var colorStyle = white ? _styles.whiteConsoleStyle : {};
  return (0, _assign2.default)({}, baseStyle, colorStyle);
};

var Terminal = function Terminal(_ref) {
  var children = _ref.children,
      white = _ref.white,
      height = _ref.height,
      code = _ref.code;

  return _react2.default.createElement(
    'div',
    { style: getWindowStyle(white) },
    _react2.default.createElement(
      'div',
      { style: getTerminalStyle(code, height) },
      _react2.default.createElement(
        'div',
        { style: _styles.headerStyle },
        _react2.default.createElement('span', {
          style: getButtonStyle('close')
        }),
        _react2.default.createElement('span', {
          style: getButtonStyle('minimize')
        }),
        _react2.default.createElement('span', {
          style: getButtonStyle('maximize')
        })
      ),
      _react2.default.createElement(
        'div',
        { style: getBodyStyle(code) },
        _react2.default.createElement(
          'div',
          { style: getConsoleStyle(code, white) },
          code ? _react2.default.createElement(
            'code',
            { style: _styles.codeStyle },
            children
          ) : _react2.default.createElement(
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
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  white: _propTypes2.default.bool,
  height: _propTypes2.default.number,
  code: _propTypes2.default.bool
};

exports.default = Terminal;