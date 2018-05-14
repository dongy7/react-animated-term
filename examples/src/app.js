import React from 'react'
import ReactDOM from 'react-dom'
import Renderer from 'react-animated-term'

const termLines = [
  {
    text: 'yarn',
    cmd: true
  },
  {
    text: 'yarn install v1.6.0',
    cmd: false
  },
  {
    text: '[1/4] 🔍  Resolving packages...',
    cmd: false
  },
  {
    text: '[2/4] 🚚  Fetching packages...',
    cmd: false
  },
  {
    text: '[3/4] 🔗  Linking dependencies...',
    cmd: false,
    frames: [
      {
        text: '[------------------------------------------------] 0/1000',
        delay: 200
      },
      {
        text: '[#######-----------------------------------------] 100/1000',
        delay: 2000
      },
      {
        text: '[###########################---------------------] 500/1000',
        delay: 200
      },
      {
        text: '[################################################] 1000/1000',
        delay: 400
      }
    ]
  },
  {
    text: '[4/4] 📃  Building fresh packages...',
    cmd: false,
    frames: [
      {
        text: '[------------------------------------------------] 0/1000',
        delay: 200
      },
      {
        text: '[#######-----------------------------------------] 100/1000',
        delay: 300
      },
      {
        text: '[###########################---------------------] 500/1000',
        delay: 1200
      },
      {
        text: '[################################################] 1000/1000',
        delay: 400
      }
    ]
  },
  {
    text: '✨  Done in 4.91s.',
    cmd: false
  },
  {
    text: '',
    cmd: true
  }
]
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const spinnerLines = [
  {
    text: 'node example.js',
    cmd: true
  },
  {
    text: '✔ Loaded app',
    cmd: false,
    repeat: true,
    repeatCount: 2,
    frames: spinnerFrames.map(function(spinner) {
      return {
        text: spinner + ' Loading app',
        delay: 80
      }
    })
  },
  {
    text: '',
    cmd: true
  }
]

class App extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1>React Animated Terminal</h1>
        <h2>Basic Example</h2>
        <div style={{ width: '480px' }}>
          <Renderer lines={termLines} interval={100} />
        </div>

        <h2>Repeated Animation Example</h2>
        <div style={{ width: '380px' }}>
          <Renderer lines={spinnerLines} interval={80} />
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('term'))
