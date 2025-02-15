import { getUserParamAll } from './redis/user-status';
import { hasUserAchievement, addUserAchievement, getUserAchievementAll } from './redis/user-achievement';
import { achieve } from '../api/user-status';
import { getAchievementProgress } from '../utils/game';
import GAME from '../config/game';

const MAX_ACHIEVEMENT = 6;

const canAchieve = async (userId: string, achvId: string, userParam: UserParam) => {
    return await hasUserAchievement(userId, achvId) && getAchievementProgress(Number(achvId), userParam) === 100;
}

export const updateUserAchievement = async (userId: string) => {
    const userParam = await getUserParamAll(userId);
    const newAchvIdList = [];
    for(let achvId = 0; achvId <= MAX_ACHIEVEMENT; achvId++) {
        if(await canAchieve(userId, String(achvId), userParam)) {
            achieveAchievement(userId, String(achvId));
            newAchvIdList.push(achvId);
        }
    }
    return newAchvIdList;
}

export const achieveAchievement = async (userId: string, achvId: string) => {
    await addUserAchievement(userId, achvId, (new Date()).toString());
    await achieve(userId, String(achvId));
}

export const createUserAchievementList = async (userId: string) => {
    const userAchvMap = await getUserAchievementAll(userId);
    const userParam = await getUserParamAll(userId);
    const res: UserAchievementListItem[] = [];
    for (const achvId in userAchvMap) {
        const achv = GAME.ACHIEVEMENT[Number(achvId)];
        if(achv) {
            res.push({
                achvId: achvId,
                achievedAt: userAchvMap.achvId,
                progress: getAchievementProgress(Number(achvId), userParam),
            });
        }
    }
    return res;
}
