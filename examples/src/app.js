import React from 'react'
import ReactDOM from 'react-dom'
import Renderer, { Code } from 'react-animated-term'
import basicLines from './terminals/basic'
import spinnerLines from './terminals/spinner'
import progressLines from './terminals/progress'
import '../../css/styles.css'

class App extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1>React Animated Terminal</h1>
        <h2>Basic Example</h2>
        <div style={{ width: '380px' }}>
          <Renderer lines={basicLines} interval={80} white />
        </div>

        <h2>Repeated Frames Example</h2>
        <div style={{ width: '380px' }}>
          <Renderer lines={spinnerLines} interval={10} />
        </div>

        <h2>Progress Bar Example</h2>
        <div style={{ width: '480px' }}>
          <Renderer lines={progressLines} interval={5} />
        </div>

        <h2>Code Example</h2>
        <div style={{ width: '380px' }}>
          <Code white>
            {`import mod from 'mod';
export default mod;`}
          </Code>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('term'))
