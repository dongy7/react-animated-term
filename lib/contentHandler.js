var _marked = /*#__PURE__*/regeneratorRuntime.mark(terminalContent);

function terminalContent(lines) {
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
          if (!true) {
            _context.next = 45;
            break;
          }

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
  }, _marked, this);
}

export default terminalContent;