const createProgressFrames = (frameCount, progressCount, maxWidth, delay) => {
  const frames = []
  const step = Math.ceil(progressCount / frameCount)

  for (let i = 0; i < progressCount; i += step) {
    const progressText = ` ${i}/${progressCount}`
    const filledLen = progressText.length + 2
    const intervalCount = maxWidth - filledLen

    const filledCount = Math.ceil((i / progressCount) * intervalCount)
    const unfilledCount = intervalCount - filledCount
    const frame = `[${'#'.repeat(filledCount)}${'-'.repeat(unfilledCount)}] ${progressText}`

    frames.push({
      text: frame,
      delay
    })
  }

  return frames
}

export default [
  {
    text: 'yarn',
    cmd: true,
    delay: 80
  },
  {
    text: 'yarn install v1.6.0',
    cmd: false,
    delay: 80
  },
  {
    text: '[1/4] 🔍  Resolving packages...',
    cmd: false,
    delay: 80
  },
  {
    text: '[2/4] 🚚  Fetching packages...',
    cmd: false
  },
  {
    text: '[3/4] 🔗  Linking dependencies...',
    cmd: false,
    frames: createProgressFrames(250, 1000, 60, 5)
  },
  {
    text: '[4/4] 📃  Building fresh packages...',
    cmd: false,
    frames: createProgressFrames(100, 2000, 60, 5)
  },
  {
    text: '✨  Done in 4.01s.',
    cmd: false
  },
  {
    text: '',
    cmd: true
  }
]