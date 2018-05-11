function* terminalContent(lines) {
  let lineIndex = 0
  let pos = 0
  const currLines = []
  if (lines.length === 0) {
    return []
  }

  while (true) {
    if (lineIndex < lines.length) {
      if (!lines[lineIndex].cmd) {
        currLines.push({
          text: lines[lineIndex].text,
          cmd: false,
          current: false
        })
        pos = 0
        lineIndex++
      } else if (pos == 0) {
        currLines.push({
          text: '',
          cmd: lines[lineIndex].cmd,
          current: true
        })
        pos++
      } else if (pos > lines[lineIndex].text.length) {
        currLines[lineIndex].current = lineIndex === lines.length - 1
        pos = 0
        lineIndex++
      } else {
        currLines[lineIndex].text = lines[lineIndex].text.substring(0, pos)
        pos++
      }
      yield currLines
    } else {
      return currLines
    }
  }
}

export default terminalContent