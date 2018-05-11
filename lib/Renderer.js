import React from 'react';
import Terminal from './Terminal';
import termContent from './contentHandler';

var Renderer = function (_React$Component) {
  babelHelpers.inherits(Renderer, _React$Component);

  function Renderer(props) {
    babelHelpers.classCallCheck(this, Renderer);

    var _this = babelHelpers.possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

    _this.content = termContent(props.lines);
    _this.state = {
      lines: _this.content.next().value
    };
    return _this;
  }

  babelHelpers.createClass(Renderer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var timer = setInterval(function () {
        var _content$next = _this2.content.next(),
            value = _content$next.value,
            done = _content$next.done;

        _this2.setState({
          lines: value
        });
        if (done) {
          clearInterval(timer);
        }
      }, 150);
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

export default Renderer;