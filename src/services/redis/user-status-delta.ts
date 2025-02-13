import redis from '../../libs/redis';
import REDIS from '../../config/redis';

export const setDeltaSteps = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY.USER_DELTA_STEPS, userId, value)
}
  
export const getDeltaSteps = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY.USER_DELTA_STEPS, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaStepsAll = async () => {
    return redis.hGetAll(REDIS.KEY.USER_DELTA_STEPS);
}
  
export const delDeltaSteps = async () => {
    await redis.del(REDIS.KEY.USER_DELTA_STEPS);
}

export const setDeltaDistance = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY.USER_DELTA_DISTANCE, userId, value)
}

export const getDeltaDistance = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY.USER_DELTA_DISTANCE, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaDistanceAll = async () => {
    return redis.hGetAll(REDIS.KEY.USER_DELTA_DISTANCE);
}
  
export const delDeltaDistance = async () => {
    await redis.del(REDIS.KEY.USER_DELTA_DISTANCE);
}

export const setDeltaExp = async (userId: string, value: string) => {
    await redis.hSet(REDIS.KEY.USER_DELTA_EXP, userId, value)
}

export const getDeltaExp = async (userId: string) => {
    const value = Number(await redis.hGet(REDIS.KEY.USER_DELTA_EXP, userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaExpAll = async () => {
    return redis.hGetAll(REDIS.KEY.USER_DELTA_EXP);
}
  
export const delDeltaExp = async () => {
    await redis.del(REDIS.KEY.USER_DELTA_EXP);
}
