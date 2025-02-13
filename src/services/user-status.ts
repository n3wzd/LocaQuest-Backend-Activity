import { getDeltaSteps, setDeltaSteps, getDeltaDistance, setDeltaDistance, getDeltaExp, setDeltaExp }  from './redis/user-status-delta';
import { addUserParam } from './redis/user-status';

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
