import React from 'react'
import PropTypes from 'prop-types'
import Terminal from './Terminal'
import termContent from './contentHandler'

class Renderer extends React.Component {
  constructor(props) {
    super(props)
    this.content = termContent(props.lines)
    this.state = {
      lines: this.content.next().value,
      completed: false,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { value, done } = this.content.next()
      this.setState({
        lines: value,
      })
      if (done) {
        clearInterval(this.timer)
        this.setState({
          completed: true,
        })
      }
    }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  replay() {
    const props = this.props
    this.content = termContent(props.lines)
    this.setState({
      completed: false,
    })
    this.timer = setInterval(() => {
      const { value, done } = this.content.next()
      this.setState({
        lines: value,
      })
      if (done) {
        clearInterval(this.timer)
        this.setState({
          completed: true,
        })
      }
    }, this.props.interval)
  }

  render() {
    return (
      <Terminal
        {...this.props}
        onReplay={() => this.replay()}
        completed={this.state.completed}
      >
        {this.state.lines}
      </Terminal>
    )
  }
}

Renderer.defaultProps = {
  interval: 100,
  lines: [],
}

Renderer.propTypes = {
  interval: PropTypes.number,
  lines: PropTypes.array,
}

export default Renderer
