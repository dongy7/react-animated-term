import React from 'react';
import PropTypes from 'prop-types';

var windowStyle = {
  width: '100%',
  height: '100%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(51, 51, 51)',
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  background: 'rgb(0, 0, 0)',
  position: 'relative'
};

var whiteWindowStyle = {
  background: '#fff',
  borderStyle: 'solid',
  borderColor: 'transparent'
};

var terminalStyle = {
  width: '100%',
  height: '240px'
};

var staticTerminalStyle = {
  width: '100%',
  height: '100%'
};

var headerStyle = {
  width: '100%',
  top: '18px',
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
  marginTop: '45px',
  position: 'absolute'
};

var staticBodyStyle = {
  width: '100%',
  height: '100%',
  marginTop: '45px'
};

var consoleStyle = {
  color: 'rgb(255, 255, 255)',
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '24px',
  margin: '0px 16px'
};

var staticConsoleStyle = {
  color: 'rgb(255, 255, 255)',
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '24px',
  margin: '40px 16px'
};

var whiteConsoleStyle = {
  color: '#000'
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
      { key: line.id },
      line.cmd ? prompt : '',
      line.text,
      line.current ? cursor : '',
      React.createElement('br', null)
    );
  });
};

var getWindowStyle = function getWindowStyle(white) {
  var style = windowStyle;
  if (white) {
    return Object.assign({}, style, whiteWindowStyle);
  }
  return style;
};

var getTerminalStyle = function getTerminalStyle(code, height) {
  var style = code ? staticTerminalStyle : terminalStyle;
  if (!code && height) {
    return Object.assign({}, style, { height: height });
  }
  return style;
};

var getButtonStyle = function getButtonStyle(type) {
  var baseStyle = windowButtonStyle;
  var btnStyle = void 0;
  if (type === 'close') {
    btnStyle = closeButtonStyle;
  } else if (type === 'minimize') {
    btnStyle = minimizeButtonStyle;
  } else {
    btnStyle = maximizeButtonStyle;
  }

  return Object.assign({}, baseStyle, btnStyle);
};

var getBodyStyle = function getBodyStyle(code) {
  return code ? staticBodyStyle : bodyStyle;
};

var getConsoleStyle = function getConsoleStyle(code, white) {
  var baseStyle = code ? staticConsoleStyle : consoleStyle;
  var colorStyle = white ? whiteConsoleStyle : {};
  return Object.assign({}, baseStyle, colorStyle);
};

var Terminal = function Terminal(_ref) {
  var children = _ref.children,
      white = _ref.white,
      height = _ref.height,
      code = _ref.code;

  return React.createElement(
    'div',
    { style: getWindowStyle(white) },
    React.createElement(
      'div',
      { style: getTerminalStyle(code, height) },
      React.createElement(
        'div',
        { style: headerStyle },
        React.createElement('span', {
          style: getButtonStyle('close')
        }),
        React.createElement('span', {
          style: getButtonStyle('minimize')
        }),
        React.createElement('span', {
          style: getButtonStyle('maximize')
        })
      ),
      React.createElement(
        'div',
        { style: getBodyStyle(code) },
        React.createElement(
          'div',
          { style: getConsoleStyle(code, white) },
          code ? React.createElement(
            'code',
            { style: codeStyle },
            children
          ) : React.createElement(
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
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  white: PropTypes.bool,
  height: PropTypes.number,
  code: PropTypes.bool
};

var terminalContent = /*#__PURE__*/regeneratorRuntime.mark(function terminalContent(lines) {
  var lineIndex, linePosition, cmdTimer, frameIndex, frameTimer, frameRepeatCounter, buffer, frames, _lines$lineIndex, repeat, repeatCount, delay;

  return regeneratorRuntime.wrap(function terminalContent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(lines.length === 0)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt('return', []);

        case 2:
          lineIndex = 0;
          linePosition = 0;
          cmdTimer = null;
          frameIndex = 0;
          frameTimer = null;
          frameRepeatCounter = 0;

          // The current contents of the terminal

          buffer = [];

        case 9:

          if (!(lineIndex < lines.length)) {
            _context.next = 43;
            break;
          }

          if (lines[lineIndex].cmd) {
            _context.next = 38;
            break;
          }

          frames = lines[lineIndex].frames;

          // a static line, add it to buffer and move to next line

          if (frames) {
            _context.next = 21;
            break;
          }

          buffer.push({
            id: lineIndex,
            text: lines[lineIndex].text,
            cmd: false,
            current: false
          });

          _context.next = 17;
          return buffer;

        case 17:
          linePosition = 0;
          lineIndex++;
          _context.next = 36;
          break;

        case 21:
          if (!(frameIndex < frames.length)) {
            _context.next = 34;
            break;
          }

          // this is the first frame
          if (frameIndex === 0) {
            // push the line's frame onto buffer only if this is the first time
            // rendering this line
            if (!frameTimer && frameRepeatCounter === 0) {
              buffer.push({
                id: lineIndex,
                text: frames[0].text,
                cmd: false,
                current: true
              });
            }
          }

          // show the current frame's text
          buffer[lineIndex].text = frames[frameIndex].text;

          // start a timer to render the next frame only after the delay

          if (!(frameTimer == null)) {
            _context.next = 32;
            break;
          }

          if (isNaN(frames[frameIndex].delay)) {
            _context.next = 31;
            break;
          }

          frameTimer = setTimeout(function () {
            clearTimeout(frameTimer);
            frameTimer = null;
            frameIndex++;
          }, frames[frameIndex].delay);
          // yield here to avoid condition where frameIndex goes out of bounds
          // from the timeout
          _context.next = 29;
          return buffer;

        case 29:
          _context.next = 32;
          break;

        case 31:
          frameIndex++;

        case 32:
          _context.next = 36;
          break;

        case 34:
          _lines$lineIndex = lines[lineIndex], repeat = _lines$lineIndex.repeat, repeatCount = _lines$lineIndex.repeatCount;

          // if current line should be repeated, reset frame counter and index

          if (repeat && frameRepeatCounter < repeatCount) {
            frameRepeatCounter++;
            frameIndex = 0;
          } else {
            // if final frame specified, use it as the text
            if (lines[lineIndex].text) {
              buffer[lineIndex].text = lines[lineIndex].text;
            }

            // move to next line
            buffer[lineIndex].current = false;
            linePosition = 0;
            frameIndex = 0;
            lineIndex++;
          }

        case 36:
          _context.next = 39;
          break;

        case 38:
          if (linePosition > lines[lineIndex].text.length) {
            // move to next line
            // if the line is the last line, current set to true to render cursor
            buffer[lineIndex].current = lineIndex === lines.length - 1;
            linePosition = 0;
            lineIndex++;
          } else {
            if (linePosition === 0 && !cmdTimer) {
              buffer.push({
                id: lineIndex,
                text: '',
                cmd: lines[lineIndex].cmd,
                current: true
              });
            }

            // set text for the line as all the text before or at the position
            buffer[lineIndex].text = lines[lineIndex].text.substring(0, linePosition);

            // only move to next line position if no delay specified
            // or timer for current position has expired
            if (cmdTimer == null) {
              delay = lines[lineIndex].delay;

              if (!isNaN(delay)) {
                cmdTimer = setTimeout(function () {
                  clearTimeout(cmdTimer);
                  cmdTimer = null;
                  linePosition++;
                }, delay);
              } else {
                linePosition++;
              }
            }
          }

        case 39:
          _context.next = 41;
          return buffer;

        case 41:
          _context.next = 44;
          break;

        case 43:
          return _context.abrupt('return', buffer);

        case 44:
          _context.next = 9;
          break;

        case 46:
        case 'end':
          return _context.stop();
      }
    }
  }, terminalContent, this);
});

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
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
        this.props,
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

var Code = function Code(_ref) {
  var children = _ref.children,
      rest = objectWithoutProperties(_ref, ['children']);

  return React.createElement(
    Terminal,
    _extends({}, rest, { code: true }),
    children
  );
};

Code.propTypes = {
  children: PropTypes.string
};

export default Renderer;
export { Code };
