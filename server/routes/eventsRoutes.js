export default [
  {
    method: 'POST',
    path: '/api/events',
    handler: (request, reply) => {
      console.log(request.payload)
      reply('Hello!');
    }
  }
];
