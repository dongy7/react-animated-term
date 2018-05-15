'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var terminalContent = /*#__PURE__*/_regenerator2.default.mark(function terminalContent(lines) {
  var lineIndex, linePosition, cmdTimer, frameIndex, frameTimer, frameRepeatCounter, buffer, frames, _lines$lineIndex, repeat, repeatCount, delay;

  return _regenerator2.default.wrap(function terminalContent$(_context) {
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
          if (!true) {
            _context.next = 46;
            break;
          }

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

exports.default = terminalContent;