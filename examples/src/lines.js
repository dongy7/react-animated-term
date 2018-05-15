const createProgressFrames = (frameCount, progressCount, maxWidth, delay) => {
  const frames = []
  const step = Math.ceil(progressCount / frameCount)

  for (let i = 0; i < progressCount; i += step) {
    const progressText = ` ${i}/${progressCount}`
    const filledLen = progressText.length + 2
    const intervalCount = maxWidth - filledLen

    const filledCount = Math.ceil((i / progressCount) * intervalCount)
    let frame = ''
    frame = frame + '['
    for (let j = 0; j < intervalCount; j++) {
      if (j < filledCount) {
        frame = frame + '#'
      } else {
        frame = frame + '-'
      }
    }
    frame = frame + ']'
    frame = frame + progressText

    frames.push({
      text: frame,
      delay
    })
  }

  return frames
}