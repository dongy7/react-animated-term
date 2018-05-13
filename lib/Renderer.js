var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './Terminal';
import termContent from './contentHandler';

var Renderer = function (_React$Component) {
  _inherits(Renderer, _React$Component);

  function Renderer(props) {
    _classCallCheck(this, Renderer);

    var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

    _this.content = termContent(props.lines);
    _this.state = {
      lines: _this.content.next().value
    };
    return _this;
  }

  _createClass(Renderer, [{
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
      return React.createElement(
        Terminal,
        null,
        this.state.lines
      );
    }
  }]);

  return Renderer;
}(React.Component);

Renderer.defaultProps = {
  interval: 100,
  lines: []
};

Renderer.propTypes = {
  interval: PropTypes.number,
  lines: PropTypes.array
};

export default Renderer;