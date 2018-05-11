function* terminalContent(lines) {
  let lineIndex = 0
  let pos = 0
  let frameIndex = 0
  const currLines = []
  if (lines.length === 0) {
    return []
  }

  while (true) {
    if (lineIndex < lines.length) {
      if (!lines[lineIndex].cmd) {
        const frames = lines[lineIndex].frames
        if (!frames) {
          currLines.push({
            text: lines[lineIndex].text,
            cmd: false,
            current: false
          })
          yield currLines
          pos = 0
          lineIndex++
        } else if (frameIndex < frames.length) {
          if (frameIndex === 0) {
            currLines.push({
              text: frames[0],
              cmd: false,
              current: true,
            })
          }
          currLines[lineIndex].text = frames[frameIndex]
          frameIndex++
          yield currLines
        } else {
          pos = 0
          frameIndex = 0
          currLines[lineIndex].current = false
          lineIndex++
        }
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