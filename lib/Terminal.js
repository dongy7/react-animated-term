'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cursor = _react2.default.createElement('span', { className: 'Terminal-cursor' });
var prompt = _react2.default.createElement(
  'span',
  { className: 'Terminal-prompt' },
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
  return (0, _classnames2.default)({
    'Terminal-window': true,
    'Terminal-window-white': white
  });
};

var getTerminalStyle = function getTerminalStyle(code) {
  return (0, _classnames2.default)({
    'Terminal-term': true,
    'Terminal-term-code': code
  });
};

var getButtonStyle = function getButtonStyle(type) {
  return (0, _classnames2.default)({
    'Terminal-btn': true,
    'Terminal-btn-close': type === 'close',
    'Terminal-btn-minimize': type === 'minimize',
    'Terminal-btn-maximize': type === 'maximize'
  });
};

var getBodyStyle = function getBodyStyle(code) {
  return (0, _classnames2.default)({
    'Terminal-body': true,
    'Terminal-body-animated': !code
  });
};

var getConsoleStyle = function getConsoleStyle(code, white) {
  return (0, _classnames2.default)({
    'Terminal-console': true,
    'Terminal-console-code': code,
    'Terminal-console-white': white
  });
};

var Terminal = function Terminal(_ref) {
  var children = _ref.children,
      white = _ref.white,
      height = _ref.height,
      code = _ref.code,
      onReplay = _ref.onReplay,
      completed = _ref.completed;

  var btnClassName = white ? 'Terminal-control-btn Terminal-control-btn-white' : 'Terminal-control-btn';

  return _react2.default.createElement(
    'div',
    { className: getWindowStyle(white) },
    _react2.default.createElement(
      'div',
      {
        className: getTerminalStyle(code),
        style: height ? { height: height } : null
      },
      _react2.default.createElement(
        'div',
        { className: 'Terminal-header' },
        _react2.default.createElement('span', { className: getButtonStyle('close') }),
        _react2.default.createElement('span', { className: getButtonStyle('minimize') }),
        _react2.default.createElement('span', { className: getButtonStyle('maximize') })
      ),
      _react2.default.createElement(
        'div',
        { className: getBodyStyle(code) },
        _react2.default.createElement(
          'div',
          { className: getConsoleStyle(code, white) },
          code ? _react2.default.createElement(
            'code',
            { className: 'Terminal-code' },
            children
          ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'Terminal-code' },
              renderLines(children)
            ),
            completed ? _react2.default.createElement(
              'a',
              { className: btnClassName, onClick: function onClick() {
                  return onReplay();
                } },
              'Replay'
            ) : null
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
  code: _propTypes2.default.bool,
  onReplay: _propTypes2.default.func,
  completed: _propTypes2.default.bool
};

exports.default = Terminal;