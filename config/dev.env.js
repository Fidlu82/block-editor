'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_ROOT_API: '"http://127.0.0.1:8081/"',
  VUE_APP_LIB_API: '"https://lib.pulsar.pl/api/"'
})
