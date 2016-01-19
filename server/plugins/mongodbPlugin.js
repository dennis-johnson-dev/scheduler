import hapiMongoDB from 'hapi-mongodb';

const mongoUri = process.env.SCHEDULER_MONGO_URI;
const dbOpts = {
  "url": mongoUri,
  "settings": {
    "db": {
      "native_parser": false
    }
  }
};

export default {
  register: hapiMongoDB,
  options: dbOpts
}
