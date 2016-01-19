import superagent from 'superagent';

export const request = (options) => {
  const { body, method, url } = options;

  return new Promise((resolve, reject) => {
    superagent[method](url)
    .send(body)
    .end((err, res) => {
      if (err) {
        reject(err);
      }
      if (!err) {
        resolve(res);
      }
    });
  });
};
