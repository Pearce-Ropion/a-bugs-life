/**
 * @file
 * @summary Production confirguration for web pack
 */

const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    devtool: "source-map",
});
