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
          if (!true) {
            _context.next = 15;
            break;
          }

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

export default terminalContent;