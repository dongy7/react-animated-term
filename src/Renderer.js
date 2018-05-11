import React from 'react'
import Terminal from './Terminal'
import termContent from './contentHandler'

class Renderer extends React.Component {
  constructor(props) {
    super(props)
    this.content = termContent(props.lines)
    this.state = {
      lines: this.content.next().value
    }
  }

  componentDidMount() {
    const timer = setInterval(() => {
      const { value, done } = this.content.next()
      this.setState({
        lines: value
      })
      if (done) {
        clearInterval(timer)
      }
    }, 150)
  }

  render() {
    return <Terminal>{this.state.lines}</Terminal>
  }
}

export default Renderer
