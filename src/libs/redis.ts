import redis from 'redis';

const client = redis.createClient({
    url: 'redis://' + process.env.NODEJS_REDIS_URL,
  });

const initRedis = async () => {
    client.on('connect', () => console.log('Redis Client connected'))
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
}

export default client;
export { initRedis }
