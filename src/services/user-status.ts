import { addDeltaSteps, addDeltaDistance, addDeltaExp }  from './redis/user-status-delta';
import { addUserParam } from './redis/user-status';

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
