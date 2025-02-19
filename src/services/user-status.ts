import { getDeltaSteps, addDeltaSteps, getDeltaDistance, addDeltaDistance, getDeltaExp, addDeltaExp }  from './redis/user-status-delta';
import { addUserParam, getUserParamAll } from './redis/user-status';
import { createUserAchievementList } from './achievement';
import { getExpLimit, getExpNextTo, getLevel } from '../utils/game';

export const countSteps = async (userId: string, date: string) => {
    const newValue = await addDeltaSteps(userId, date, 1);
    await addUserParam(userId, 'steps', 1);
}

export const gainDistance = async (userId: string, date: string, distance: number) => {
    const newValue = await addDeltaDistance(userId, date, distance);
    await addUserParam(userId, 'distance', distance);
}

export const gainExp = async (userId: string, date: string, exp: number) => {
    const newValue = await addDeltaExp(userId, date, exp);
    await addUserParam(userId, 'exp', exp);
}

export const createUserStatusData = async (userId: string): Promise<UserStatus> => {
    const params = await getUserParamAll(userId);
    const exp = params.exp;
    const level = getLevel(exp);
    return {
        steps: params.steps,
        distance: params.distance,
        exp: exp,
        level: level,
        expCurTo: getExpLimit(level),
        expNextTo: getExpNextTo(exp),
        achievementList: await createUserAchievementList(userId),
    } 
}
