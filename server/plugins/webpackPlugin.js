import Webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';

import config from '../../webpack.config';

const compiler = Webpack(config);
const assets = {
  noInfo: true,
  publicPath: config.output.publicPath,
  reload: true
};
const hot = {};

export default {
  register: WebpackPlugin,
  options: {
    compiler,
    assets,
    hot
  }
};
