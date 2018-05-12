function* terminalContent(lines) {
  if (lines.length === 0) {
    return []
  }

  let lineIndex = 0
  let linePosition = 0
  let frameIndex = 0
  let frameTimer = false
  let frameRepeatCounter = 0

  // The current contents of the terminal
  const buffer = []

  while (true) {
    if (lineIndex < lines.length) {
      // next line is an output line
      if (!lines[lineIndex].cmd) {
        const frames = lines[lineIndex].frames
        const { repeat, repeatCount } = lines[lineIndex]

        // a static line, add it to buffer and move to next line
        if (!frames) {
          buffer.push({
            text: lines[lineIndex].text,
            cmd: false,
            current: false
          })

          yield buffer
          linePosition = 0
          lineIndex++
        } else if (frameIndex < frames.length) {
          // this is the first frame
          if (frameIndex === 0) {
            // push the line's frame onto buffer only if this is the first time 
            // rendering this line
            if (!frameTimer && (frameRepeatCounter === 0)) {
              buffer.push({
                text: frames[0].text,
                cmd: false,
                current: true,
              })
            }
          }

          // show the current frame's text
          buffer[lineIndex].text = frames[frameIndex].text

          // start a timer to render the next frame only after the delay
          if (!frameTimer) {
            frameTimer = setTimeout(() => {
              frameIndex++
              clearTimeout(frameTimer)
              frameTimer = false
            }, frames[frameIndex].delay)
          }

          yield buffer
        } else {
          const { repeat, repeatCount } = lines[lineIndex]

          // if current line should be repeated, reset frame counter and index
          if (repeat && (frameRepeatCounter < repeatCount)) {
            frameRepeatCounter++
            frameIndex = 0
          } else {
            // if final frame specified, use it as the text
            if (lines[lineIndex].finalFrame) {
              buffer[lineIndex].text = lines[lineIndex].finalFrame
            }

            // move to next line
            buffer[lineIndex].current = false
            linePosition = 0
            frameIndex = 0
            lineIndex++
          }
        }
      } else if (linePosition == 0) {
        buffer.push({
          text: '',
          cmd: lines[lineIndex].cmd,
          current: true
        })
        linePosition++
      } else if (linePosition > lines[lineIndex].text.length) {
        // move to next line
        // if the line is the last line, current set to true to render cursor
        buffer[lineIndex].current = lineIndex === lines.length - 1
        linePosition = 0
        lineIndex++
      } else {
        // set text for the line as all the text before or at the position
        buffer[lineIndex].text = lines[lineIndex].text.substring(0, linePosition)
        linePosition++
      }
      yield buffer
    } else {
      // no more lines to process
      // signal finsihed to allow renderer to stop querying for new terminal content
      return buffer
    }
  }
}

export default terminalContent