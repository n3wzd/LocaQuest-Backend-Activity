
import redis from '../../libs/redis';
import REDIS from '../../config/redis';

type FieldName = "steps" | "distance" | "exp";

const fieldName = (name: FieldName) => {
    switch(name) {
        case "steps": return REDIS.FIELD.USER_STATUS.STEPS;
        case "distance": return REDIS.FIELD.USER_STATUS.DISTANCE;
        case "exp": return REDIS.FIELD.USER_STATUS.EXP;
    }
}

export const setUserParam = async (userId: string, field: FieldName, value: string) => {
    await redis.hSet(REDIS.KEY.USER_STATUS(userId), fieldName(field), value);
}

export const getUserParam = async (userId: string, field: FieldName) => {
    const value = Number(await redis.hGet(REDIS.KEY.USER_STATUS(userId), fieldName(field)) ?? 0);
    return Number.isNaN(value) ? 0 : value;
}

export const addUserParam = async (userId: string, field: FieldName, value: number) => {
    setUserParam(userId, field, String(await getUserParam(userId, field) + value));
}

export const setUserParamAll = async (userId: string, params: UserParam) => {
    await setUserParam(userId, "steps", String(params["steps"]));
    await setUserParam(userId, "distance", String(params["distance"]));
    await setUserParam(userId, "exp", String(params["exp"]));
}

export const getUserParamAll = async (userId: string): Promise<UserParam> => {
    return {
        steps: await getUserParam(userId, "steps"),
        distance: await getUserParam(userId, "distance"),
        exp: await getUserParam(userId, "exp"),
    }
}
