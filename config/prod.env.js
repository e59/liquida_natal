var merge = require('webpack-merge')
var localEnv = require('./local.env')

module.exports = merge(localEnv.production, {
    NODE_ENV: '"production"'
})
