(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global.Renderer = factory(global.React,global.PropTypes));
}(this, (function (React,PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  var windowStyle = {
    width: '100%',
    height: '100%',
    bprderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(51, 51, 51)',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 1px 2px 5px 0px',
    background: 'rgb(0, 0, 0)',
    position: 'relative'
  };

  var terminalStyle = {
    width: '100%',
    height: '240px'
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
        { key: line.id },
        line.cmd ? prompt : '',
        line.text,
        line.current ? cursor : '',
        React.createElement('br', null)
      );
    });
  };

  var Terminal = function Terminal(_ref) {
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
  };

  Terminal.propTypes = {
    children: PropTypes.array
  };

  var terminalContent = /*#__PURE__*/regeneratorRuntime.mark(function terminalContent(lines) {
    var lineIndex, linePosition, frameIndex, frameTimer, frameRepeatCounter, buffer, frames, _lines$lineIndex, repeat, repeatCount;

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
            frameIndex = 0;
            frameTimer = false;
            frameRepeatCounter = 0;

            // The current contents of the terminal

            buffer = [];

          case 8:

            if (!(lineIndex < lines.length)) {
              _context.next = 42;
              break;
            }

            if (lines[lineIndex].cmd) {
              _context.next = 37;
              break;
            }

            frames = lines[lineIndex].frames;

            // a static line, add it to buffer and move to next line

            if (frames) {
              _context.next = 20;
              break;
            }

            buffer.push({
              id: lineIndex,
              text: lines[lineIndex].text,
              cmd: false,
              current: false
            });

            _context.next = 16;
            return buffer;

          case 16:
            linePosition = 0;
            lineIndex++;
            _context.next = 35;
            break;

          case 20:
            if (!(frameIndex < frames.length)) {
              _context.next = 33;
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

            if (frameTimer) {
              _context.next = 31;
              break;
            }

            if (isNaN(frames[frameIndex].delay)) {
              _context.next = 30;
              break;
            }

            frameTimer = setTimeout(function () {
              frameIndex++;
              clearTimeout(frameTimer);
              frameTimer = false;
            }, frames[frameIndex].delay);
            // yield here to avoid condition where frameIndex goes out of bounds
            // from the timeout
            _context.next = 28;
            return buffer;

          case 28:
            _context.next = 31;
            break;

          case 30:
            frameIndex++;

          case 31:
            _context.next = 35;
            break;

          case 33:
            _lines$lineIndex = lines[lineIndex], repeat = _lines$lineIndex.repeat, repeatCount = _lines$lineIndex.repeatCount;

            // if current line should be repeated, reset frame counter and index

            if (repeat && frameRepeatCounter < repeatCount) {
              frameRepeatCounter++;
              frameIndex = 0;
            } else {
              // if final frame specified, use it as the text
              if (lines[lineIndex].finalFrame) {
                buffer[lineIndex].text = lines[lineIndex].finalFrame;
              }

              // move to next line
              buffer[lineIndex].current = false;
              linePosition = 0;
              frameIndex = 0;
              lineIndex++;
            }

          case 35:
            _context.next = 38;
            break;

          case 37:
            if (linePosition === 0) {
              buffer.push({
                id: lineIndex,
                text: '',
                cmd: lines[lineIndex].cmd,
                current: true
              });
              linePosition++;
            } else if (linePosition > lines[lineIndex].text.length) {
              // move to next line
              // if the line is the last line, current set to true to render cursor
              buffer[lineIndex].current = lineIndex === lines.length - 1;
              linePosition = 0;
              lineIndex++;
            } else {
              // set text for the line as all the text before or at the position
              buffer[lineIndex].text = lines[lineIndex].text.substring(0, linePosition);
              linePosition++;
            }

          case 38:
            _context.next = 40;
            return buffer;

          case 40:
            _context.next = 43;
            break;

          case 42:
            return _context.abrupt('return', buffer);

          case 43:
            _context.next = 8;
            break;

          case 45:
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

  return Renderer;

})));
