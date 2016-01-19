import Hapi from 'hapi';
import Path from 'path';

import plugins from './plugins';
import routes from './routes';

export const buildSite = () => {
  const server = new Hapi.Server();
  server.connection({
    port: 3000
  });

  server.register(plugins, (error) => {
    if (error) {
      return console.error(error);
    }

    server.route(routes);

    server.start(() => {
      console.log('Server running at:', server.info.uri);
    });
  });
};
