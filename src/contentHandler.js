function* terminalContent(lines) {
  let lineIndex = 0
  let pos = 0
  let frameIndex = 0
  let frameTimer = false
  let frameRepeatCounter = 0
  const currLines = []
  
  if (lines.length === 0) {
    return []
  }

  while (true) {
    if (lineIndex < lines.length) {
      if (!lines[lineIndex].cmd) {
        const frames = lines[lineIndex].frames
        const { repeat, repeatCount } = lines[lineIndex]
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
            if (!frameTimer && (frameRepeatCounter === 0)) {
              currLines.push({
                text: frames[0].text,
                cmd: false,
                current: true,
              })
            }
          }
          currLines[lineIndex].text = frames[frameIndex].text
          if (!frameTimer) {
            frameTimer = setTimeout(() => {
              frameIndex++
              clearTimeout(frameTimer)
              frameTimer = false
            }, frames[frameIndex].delay)
          }

          yield currLines
        } else {
          const { repeat, repeatCount } = lines[lineIndex]
          if (repeat && (frameRepeatCounter < repeatCount)) {
            frameRepeatCounter++
            frameIndex = 0
          } else {
            pos = 0
            frameIndex = 0
            currLines[lineIndex].current = false
            if (lines[lineIndex].finalFrame) {
              currLines[lineIndex].text = lines[lineIndex].finalFrame
            }
            lineIndex++
          }
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