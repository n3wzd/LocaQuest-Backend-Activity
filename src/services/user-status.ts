
import redis from '../utils/redis';
import REDIS from '../config/redis';

const setSteps = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY_STEPS, userId, value)
}
  
const getSteps = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY_STEPS, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
const getStepsAll = async () => {
    return redis.hGetAll(REDIS.KEY_STEPS);
}
  
const delSteps = async () => {
    await redis.del(REDIS.KEY_STEPS);
}

const setDistance = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY_DISTANCE, userId, value)
}

const getDistance = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY_DISTANCE, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
const getDistanceAll = async () => {
    return redis.hGetAll(REDIS.KEY_DISTANCE);
}
  
const delDistance = async () => {
    await redis.del(REDIS.KEY_DISTANCE);
}

const setExp = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY_EXP, userId, value)
}

const getExp = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY_EXP, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
const getExpAll = async () => {
    return redis.hGetAll(REDIS.KEY_EXP);
}
  
const delExp = async () => {
    await redis.del(REDIS.KEY_EXP);
}

const countSteps = async (userId: string) => {
    const value = await getSteps(userId);
    await setSteps(userId, String(value + 1));
    console.debug(`${userId} steps: ${value + 1}`);

    await gainExp(userId, 10);
}

const gainDistance = async (userId: string, distance: number) => {
    const value = await getDistance(userId);
    await setDistance(userId, String(value + distance));
    console.debug(`${userId} distance: ${value + distance}`);

    await gainExp(userId, distance * 20);
}

const gainExp = async (userId: string, exp: number) => {
    const value = await getExp(userId);
    await setExp(userId, String(value + exp));
    console.debug(`${userId} exp: ${value + exp}`);
}

export default { 
    setSteps, getSteps, getStepsAll, delSteps,
    setDistance, getDistance, getDistanceAll, delDistance,
    setExp, getExp, getExpAll, delExp,
    countSteps, gainDistance, gainExp
};
