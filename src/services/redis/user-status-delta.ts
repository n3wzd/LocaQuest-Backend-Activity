import redis from '../../libs/redis';
import REDIS from '../../config/redis';

let TIMESTAMP = (new Date()).toString();
const KEY_SET = {
    DELTA_STEPS: () => REDIS.KEY.USER_DELTA_STEPS + TIMESTAMP,
    DELTA_DISTANCE: () => REDIS.KEY.USER_DELTA_DISTANCE + TIMESTAMP,
    DELTA_EXP: () => REDIS.KEY.USER_DELTA_EXP + TIMESTAMP,
}
const outdatedKeyBuffer: string[] = [];

export const setDeltaSteps = async (userId: string, value: string) => {
    await redis.hSet(KEY_SET.DELTA_STEPS(), userId, value)
}
  
export const getDeltaSteps = async (userId: string) => {
    const value = Number(await redis.hGet(KEY_SET.DELTA_STEPS(), userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaStepsAll = async () => {
    return redis.hGetAll(KEY_SET.DELTA_STEPS());
}

export const setDeltaDistance = async (userId: string, value: string) => {
    await redis.hSet(KEY_SET.DELTA_DISTANCE(), userId, value)
}

export const getDeltaDistance = async (userId: string) => {
    const value = Number(await redis.hGet(KEY_SET.DELTA_DISTANCE(), userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaDistanceAll = async () => {
    return redis.hGetAll(KEY_SET.DELTA_DISTANCE());
}

export const setDeltaExp = async (userId: string, value: string) => {
    await redis.hSet(KEY_SET.DELTA_EXP(), userId, value)
}

export const getDeltaExp = async (userId: string) => {
    const value = Number(await redis.hGet(KEY_SET.DELTA_EXP(), userId) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}
  
export const getDeltaExpAll = async () => {
    return redis.hGetAll(KEY_SET.DELTA_EXP());
}

export const updateKeyTimestamp = () => {
    outdatedKeyBuffer.push(KEY_SET.DELTA_DISTANCE());
    outdatedKeyBuffer.push(KEY_SET.DELTA_STEPS());
    outdatedKeyBuffer.push(KEY_SET.DELTA_EXP());
    TIMESTAMP = (new Date()).toString();
}

export const delOutdatedKey = async () => {
    for(const key of outdatedKeyBuffer) {
        await redis.del(key);
    }
}
