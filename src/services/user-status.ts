import { getDeltaSteps, setDeltaSteps, getDeltaDistance, setDeltaDistance, getDeltaExp, setDeltaExp }  from './redis/user-status-delta';
import { addUserParam, getUserParamAll } from './redis/user-status';
import { createUserAchievementList } from './achievement';
import { getExpLimit, getExpNextTo, getLevel } from '../utils/game';

export const countSteps = async (userId: string) => {
    const value = await getDeltaSteps(userId);
    await setDeltaSteps(userId, String(value + 1));
    await addUserParam(userId, 'steps', 1);
}

export const gainDistance = async (userId: string, distance: number) => {
    const value = await getDeltaDistance(userId);
    await setDeltaDistance(userId, String(value + distance));
    await addUserParam(userId, 'distance', distance);
}

export const gainExp = async (userId: string, exp: number) => {
    const value = await getDeltaExp(userId);
    await setDeltaExp(userId, String(value + exp));
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
