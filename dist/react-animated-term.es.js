import React from 'react';
import 'regenerator-runtime/runtime';

var windowStyle = {
  width: '100%',
  height: '100%',
  bprderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(51, 51, 51)',
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 1px 2px 5px 0px',
  background: 'rgb(0, 0, 0)'
};

var terminalStyle = {
  width: '100%',
  height: '240px'
};

var headerStyle = {
  width: '100%',
  height: '34px',
  position: 'absolute'
};

var windowButtonStyle = {
  borderRadius: '50%',
  display: 'inline-block',
  width: '12px',
  height: '12px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
};

var closeButtonStyle = {
  backgroundColor: 'rgb(255, 95, 86)',
  left: '13px'
};

var minimizeButtonStyle = {
  backgroundColor: 'rgb(255, 189, 46)',
  left: '33px'
};

var maximizeButtonStyle = {
  backgroundColor: 'rgb(39, 201, 63)',
  left: '53px'
};

var bodyStyle = {
  width: '100%',
  height: '100%',
  marginTop: '60px',
  position: 'absolute'
};

var consoleStyle = {
  color: 'rgb(255, 255, 255)',
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '24px',
  margin: '0px 16px'
};

var codeStyle = {
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '20px',
  margin: '0px',
  whiteSpace: 'pre-wrap'
};

var promptStyle = {
  color: 'rgb(204, 204, 204)'
};

var cursorStyle = {
  background: 'rgba(248,28,229)',
  display: 'inline-block',
  width: '6px',
  height: '15px',
  verticalAlign: 'middle'
};

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

var Terminal = (function (_ref) {
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

var _marked = /*#__PURE__*/regeneratorRuntime.mark(terminalContent);

function terminalContent(lines) {
  var lineIndex, pos, currLines;
  return regeneratorRuntime.wrap(function terminalContent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          lineIndex = 0;
          pos = 0;
          currLines = [];

          if (!(lines.length === 0)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt('return', []);

        case 5:

          if (!(lineIndex < lines.length)) {
            _context.next = 12;
            break;
          }

          if (!lines[lineIndex].cmd) {
            currLines.push({
              text: lines[lineIndex].text,
              cmd: false,
              current: false
            });
            pos = 0;
            lineIndex++;
          } else if (pos == 0) {
            currLines.push({
              text: '',
              cmd: lines[lineIndex].cmd,
              current: true
            });
            pos++;
          } else if (pos > lines[lineIndex].text.length) {
            currLines[lineIndex].current = lineIndex === lines.length - 1;
            pos = 0;
            lineIndex++;
          } else {
            currLines[lineIndex].text = lines[lineIndex].text.substring(0, pos);
            pos++;
          }
          _context.next = 10;
          return currLines;

        case 10:
          _context.next = 13;
          break;

        case 12:
          return _context.abrupt('return', currLines);

        case 13:
          _context.next = 5;
          break;

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Renderer = function (_React$Component) {
  inherits(Renderer, _React$Component);

  function Renderer(props) {
    classCallCheck(this, Renderer);

    var _this = possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

    _this.content = terminalContent(props.lines);
    _this.state = {
      lines: _this.content.next().value
    };
    return _this;
  }

  createClass(Renderer, [{
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
