const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = require('../index.js');
const config = require('../config/config.js');
const webpack_config = require('../../webpack.config.js');
const compiler = webpack(webpack_config);

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpack_config.output.publicPath
}))

app.listen(config.port);
console.log('Pika running at http://localhost:' + config.port);
