const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
export default [
  {
    text: 'node example.js',
    cmd: true,
    delay: 80
  },
  {
    text: '✔ Loaded app',
    cmd: false,
    repeat: true,
    repeatCount: 5,
    frames: spinnerFrames.map(function(spinner) {
      return {
        text: spinner + ' Loading app',
        delay: 40
      }
    })
  },
  {
    text: '',
    cmd: true
  }
]