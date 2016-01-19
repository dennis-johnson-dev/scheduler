import Path from 'path';

export default {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.file(Path.resolve(__dirname, '../../index.html'));
  }
};
