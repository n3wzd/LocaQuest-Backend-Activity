import redis from 'redis';
import pool from './database';

const STEPS_KEY = 'user_steps';
const SYNC_USER_STEPS_DB_PERIOD = 60000;

console.log(process.env.NODEJS_REDIS_URL);
const client = redis.createClient({
    url: 'redis://' + process.env.NODEJS_REDIS_URL,
  });

const startRedis = async () => {
    client.on('connect', () => console.log('Redis Client connected'))
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
    setInterval(syncUserStepsToDB, SYNC_USER_STEPS_DB_PERIOD);
}

const set = async (key: string, value: string) => {
  await client.set(key, value);
}

const get = async (key: string) => {
  return await client.get(key);
}

const del = async (key: string) => {
  await client.del(key);
}

const hSet = async (key: string, field: string, value: string) => {
  await client.hSet(key, field, value);
}

const hGet = async (key: string, field: string) => {
  return await client.hGet(key, field);
}

const hGetAll = async (key: string) => {
  return await client.hGetAll(key);
}

const setUserSteps = async (userId: string, value: string) => {
  await hSet(STEPS_KEY, userId, value)
}

const getUserSteps = async (userId: string) => {
  const stepsData = Number(await hGet(STEPS_KEY, userId) ?? 0);
  return Number.isNaN(stepsData) ? 0 : stepsData;
}

const syncUserStepsToDB = async () => {
    const dataMap = await hGetAll(STEPS_KEY);
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      for (let userId in dataMap) {
        await connection.query('UPDATE user_activitys SET steps = steps + ? WHERE user_id = ?', [dataMap[userId], userId]);
      }
      await connection.commit();
      await del(STEPS_KEY);
      console.log('syncUserStepsToDB successfully');
    } catch (error) {
      await connection.rollback();
      console.error('syncUserStepsToDB failed, rolled back:', error);
    } finally {
      connection.release();
    }
}

export { startRedis, setUserSteps, getUserSteps }
