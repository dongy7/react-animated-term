const npsUtils = require('nps-utils')
const series = npsUtils.series
const rimraf = npsUtils.rimraf
const concurrent = npsUtils.concurrent

module.exports = {
  scripts: {
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        rimraf('dist'),
        rimraf('lib'),
        'mkdir -p dist',
        concurrent.nps('build.css', 'build.rollup', 'build.babel')
      ),
      rollup: 'rollup --config',
      babel: 'babel src -d lib',
      css: 'cp css/styles.css dist/react-animated-term.css'
    },
    prettier: {
      description: 'run prettier on src files',
      default: 'prettier --single-quote --no-semi --write "src/**/*.js"'
    }
  }
}
