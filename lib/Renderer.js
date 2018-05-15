'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Terminal = require('./Terminal');

var _Terminal2 = _interopRequireDefault(_Terminal);

var _contentHandler = require('./contentHandler');

var _contentHandler2 = _interopRequireDefault(_contentHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderer = function (_React$Component) {
  (0, _inherits3.default)(Renderer, _React$Component);

  function Renderer(props) {
    (0, _classCallCheck3.default)(this, Renderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Renderer.__proto__ || (0, _getPrototypeOf2.default)(Renderer)).call(this, props));

    _this.content = (0, _contentHandler2.default)(props.lines);
    _this.state = {
      lines: _this.content.next().value
    };
    return _this;
  }

  (0, _createClass3.default)(Renderer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = setInterval(function () {
        var _content$next = _this2.content.next(),
            value = _content$next.value,
            done = _content$next.done;

        _this2.setState({
          lines: value
        });
        if (done) {
          clearInterval(_this2.timer);
        }
      }, this.props.interval);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Terminal2.default,
        this.props,
        this.state.lines
      );
    }
  }]);
  return Renderer;
}(_react2.default.Component);

Renderer.defaultProps = {
  interval: 100,
  lines: []
};

Renderer.propTypes = {
  interval: _propTypes2.default.number,
  lines: _propTypes2.default.array
};

exports.default = Renderer;