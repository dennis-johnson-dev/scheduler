import Good from 'good';
import GoodConsole from 'good-console';

export default {
  register: Good,
  options: {
    reporters: [
      {
        reporter: GoodConsole,
        events: {
          request: '*',
          response: '*',
          log: '*',
          wreck: '*'
        },
        config: {
          format: 'hh:MM:SSS'
        }
      }
    ]
  }
};
