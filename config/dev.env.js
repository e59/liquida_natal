var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var localEnv = require('./local.env')

module.exports = merge(prodEnv, localEnv.development, {
  NODE_ENV: '"development"'
})
