
import redis from '../../libs/redis';
import REDIS from '../../config/redis';

type FieldName = "STEPS" | "DISTANCE" | "EXP";

const fieldName = (name: FieldName) => {
    switch(name) {
        case "STEPS": return REDIS.FIELD.USER_STATUS.STEPS;
        case "DISTANCE": return REDIS.FIELD.USER_STATUS.DISTANCE;
        case "EXP": return REDIS.FIELD.USER_STATUS.EXP;
    }
}

const setParam = async (userId: string, field: FieldName, value: string) => {
    await redis.hSet(REDIS.KEY.USER_STATUS(userId), fieldName(field), value);
}

const getParam = async (userId: string, field: FieldName) => {
    const value = Number(await redis.hGet(REDIS.KEY.USER_STATUS(userId), fieldName(field)) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}

const addParam = async (userId: string, field: FieldName, value: number) => {
    setParam(userId, field, String(await getParam(userId, field) + value));
}

export default { 
    setParam, getParam, addParam
};
