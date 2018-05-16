import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const path = 'dist/react-animated-term'
const globals = {
  classnames: 'classNames',
  'react-dom': 'ReactDOM',
  react: 'React',
  'prop-types': 'PropTypes'
}
const external = Object.keys(globals)
const babelOptions = (prod) =>  {
  let options = {
    babelrc: false,
    presets: [['env', { modules: false }], 'stage-0', 'react'],
    plugins: ['external-helpers']
  }

  if (prod) {
    options.plugins.push('transform-react-remove-prop-types')
  }
  return options
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es'
    },
    external: external,
    plugins: [babel(babelOptions(false)), resolve()]
  }
]
