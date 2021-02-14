import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

var cursor = React.createElement('span', { className: 'Terminal-cursor' });
var prompt = React.createElement(
  'span',
  { className: 'Terminal-prompt' },
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
  return classNames({
    'Terminal-window': true,
    'Terminal-window-white': white
  });
};

var getTerminalStyle = function getTerminalStyle(code) {
  return classNames({
    'Terminal-term': true,
    'Terminal-term-code': code
  });
};

var getButtonStyle = function getButtonStyle(type) {
  return classNames({
    'Terminal-btn': true,
    'Terminal-btn-close': type === 'close',
    'Terminal-btn-minimize': type === 'minimize',
    'Terminal-btn-maximize': type === 'maximize'
  });
};

var getBodyStyle = function getBodyStyle(code) {
  return classNames({
    'Terminal-body': true,
    'Terminal-body-animated': !code
  });
};

var getConsoleStyle = function getConsoleStyle(code, white) {
  return classNames({
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

  return React.createElement(
    'div',
    { className: getWindowStyle(white) },
    React.createElement(
      'div',
      {
        className: getTerminalStyle(code),
        style: height ? { height: height } : null
      },
      React.createElement(
        'div',
        { className: 'Terminal-header' },
        React.createElement('span', { className: getButtonStyle('close') }),
        React.createElement('span', { className: getButtonStyle('minimize') }),
        React.createElement('span', { className: getButtonStyle('maximize') })
      ),
      React.createElement(
        'div',
        { className: getBodyStyle(code) },
        React.createElement(
          'div',
          { className: getConsoleStyle(code, white) },
          code ? React.createElement(
            'code',
            { className: 'Terminal-code' },
            children
          ) : React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'Terminal-code' },
              renderLines(children)
            ),
            completed ? React.createElement(
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
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  white: PropTypes.bool,
  height: PropTypes.number,
  code: PropTypes.bool,
  onReplay: PropTypes.func,
  completed: PropTypes.bool
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
      lines: _this.content.next().value,
      completed: false
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
          _this2.setState({
            completed: true
          });
        }
      }, this.props.interval);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: 'replay',
    value: function replay() {
      var _this3 = this;

      var props = this.props;
      this.content = terminalContent(props.lines);
      this.setState({
        completed: false
      });
      this.timer = setInterval(function () {
        var _content$next2 = _this3.content.next(),
            value = _content$next2.value,
            done = _content$next2.done;

        _this3.setState({
          lines: value
        });
        if (done) {
          clearInterval(_this3.timer);
          _this3.setState({
            completed: true
          });
        }
      }, this.props.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        Terminal,
        _extends({}, this.props, {
          onReplay: function onReplay() {
            return _this4.replay();
          },
          completed: this.state.completed
        }),
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
