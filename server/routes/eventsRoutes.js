export default [
  {
    method: 'POST',
    path: '/api/events',
    handler: (request, reply) => {
      const db = request.server.plugins['hapi-mongodb'].db;
      db.collection('events').insertOne(request.payload, (err, result) => {
        reply(result);
      });
    }
  }
];
