import superagent from 'superagent';

export const request = (options) => {
  const { method, url } = options;

  return new Promise((resolve, reject) => {
    superagent[method](url)
    .send('Accept', 'application/json')
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
