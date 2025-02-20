import { getUserParamAll } from './redis/user-status';
import { hasUserAchievement, addUserAchievement, getUserAchievementAll } from './redis/user-achievement';
import { achieve } from '../api/user-status';
import { getAchievementProgress } from '../utils/game';
import GAME from '../config/game';

const canAchieve = async (userId: string, achvId: string, userParam: UserParam) => {
    return !(await hasUserAchievement(userId, achvId)) && getAchievementProgress(Number(achvId), userParam) === 100;
}

export const updateUserAchievement = async (userId: string, date: string) => {
    const userParam = await getUserParamAll(userId);
    const newAchvList: UserAchievement[] = [];
    for(let achvId = 0; achvId <= GAME.ACHIEVEMENT.length; achvId++) {
        if(await canAchieve(userId, String(achvId), userParam)) {
            achieveAchievement(userId, String(achvId));
            newAchvList.push({ achvId: String(achvId), achievedAt: date });
        }
    }
    return newAchvList;
}

export const achieveAchievement = async (userId: string, achvId: string) => {
    const achievedAt = (new Date()).toString();
    await addUserAchievement(userId, achvId, achievedAt);
    await achieve(userId, String(achvId), achievedAt);
}
