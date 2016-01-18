import Path from 'path';
import Inert from 'inert';
import Hapi from 'hapi';
import Webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';
import config from './webpack.config';

export const buildSite = () => {
  const server = new Hapi.Server();
  server.connection({
    port: 3000
  });

  const compiler = Webpack(config);
  const assets = {
    noInfo: true,
    publicPath: config.output.publicPath,
    reload: true
  };
  const hot = {};

  server.register([{
    register: WebpackPlugin,
    options: {
      compiler,
      assets,
      hot
    }
  }, {
    register: Inert
  }], (error) => {
    if (error) {
      return console.error(error);
    }

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.file(Path.resolve('./index.html'));
      }
    });

    server.start(() => {
      console.log('Server running at:', server.info.uri);
    });
  });
};
