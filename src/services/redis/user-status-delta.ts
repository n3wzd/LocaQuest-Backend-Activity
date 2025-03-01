import redis from '../../libs/redis';
import REDIS from '../../config/redis';

const TTL = 300;
const KEY_SET = {
    DELTA_STEPS: (userId: string, date: string) => `${REDIS.KEY.USER_DELTA_STEPS}:${userId}:${date}`,
    DELTA_DISTANCE: (userId: string, date: string) => `${REDIS.KEY.USER_DELTA_DISTANCE}:${userId}:${date}`,
    DELTA_EXP: (userId: string, date: string) => `${REDIS.KEY.USER_DELTA_EXP}:${userId}:${date}`,
}

const addData = async (key: string, value: number) => {
    await redis.multi()
        .SADD(REDIS.KEY.USER_DELTA_CLIENT, key)
        .INCRBY(key, value)
        .exec();
    redis.expire(key, TTL);
}

const getData = async (key: string) => {
    const value = Number(await redis.get(key));
    return Number.isNaN(value) ? 0 : value;
}

export const addDeltaSteps = async (userId: string, date: string, value: number) => {
    await addData(KEY_SET.DELTA_STEPS(userId, date), value);
}

export const getDeltaSteps = async (userId: string, date: string) => {
    return await getData(KEY_SET.DELTA_STEPS(userId, date));
}

export const addDeltaDistance = async (userId: string, date: string, value: number) => {
    await addData(KEY_SET.DELTA_DISTANCE(userId, date), value);
}

export const getDeltaDistance = async (userId: string, date: string) => {
    return await getData(KEY_SET.DELTA_DISTANCE(userId, date));
}

export const addDeltaExp = async (userId: string, date: string, value: number) => {
    await addData(KEY_SET.DELTA_EXP(userId, date), value);
}

export const getDeltaExp = async (userId: string, date: string) => {
    return await getData(KEY_SET.DELTA_EXP(userId, date));
}

const getKeySet = async () => {
    return (await redis.multi()
        .SMEMBERS(REDIS.KEY.USER_DELTA_CLIENT)
        .DEL(REDIS.KEY.USER_DELTA_CLIENT)
        .exec())[0];
}

export const flushAndRetrieveAllData = async () => {
    const keySet = (await getKeySet()) as string[];
    const userMap = new Map<string, UserParam>();
    for (const key of keySet) {
        const [ type, userId, date ] = key.split(':');
        const userMapKey = `${userId}:${date}`;
        if (!userMap.has(userMapKey)) {
            userMap.set(userMapKey, { steps: 0, exp: 0, distance: 0 });
        }
        const param = userMap.get(userMapKey) as UserParam;
        const getValue = async () => {
            const value = await getData(key);
            redis.INCRBY(key, -value);
            return value;
        }
        switch(type) {
            case REDIS.KEY.USER_DELTA_STEPS: param.steps = await getValue(); break;
            case REDIS.KEY.USER_DELTA_DISTANCE: param.distance = await getValue(); break;
            case REDIS.KEY.USER_DELTA_EXP: param.exp = await getValue(); break;
        }
        userMap.set(userMapKey, param);
    }
    return userMap;
}
