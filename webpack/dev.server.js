var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./dev.config.js');
var path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../build/')

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: BUILD_DIR,
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
server.listen(process.env.WEBPACK_PORT || 8082, 'localhost', function() {});
