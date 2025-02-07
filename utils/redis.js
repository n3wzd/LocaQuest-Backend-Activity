import redis from 'redis';

const client = redis.createClient({
    host: process.env.NODEJS_REDIS_URL,
    port: process.env.NODEJS_REDIS_PORT,
  });

const start = () => {
    client.on('connect', function() {
        console.log('Connected to Redis');
      });
}

const set = (key, value) => {
    client.set(key, value, (err) => { if (err) { console.error('Error setting value:', err); } });
}

const get = (key) => {
    client.get(key, (err) => { if (err) { console.error('Error getting value:', err); } });
}

export default {
    start: start,
    set: set,
    get: get,
}
