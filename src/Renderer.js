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
    this.timer = setInterval(() => {
      const { value, done } = this.content.next()
      this.setState({
        lines: value
      })
      if (done) {
        clearInterval(this.timer)
      }
    }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <Terminal>{this.state.lines}</Terminal>
  }
}

export default Renderer
