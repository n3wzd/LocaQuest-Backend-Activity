import { getUserParamAll } from './redis/user-status';
import { hasUserAchievement, addUserAchievement, getUserAchievementAll } from './redis/user-achievement';
import { achieve } from '../api/user-status';
import { getAchievementProgress } from '../utils/game';
import GAME from '../config/game';

const MAX_ACHIEVEMENT = 6;

const canAchieve = async (userId: string, achvId: string, userParam: UserParam) => {
    return await hasUserAchievement(userId, achvId) && getAchievementProgress(Number(achvId), userParam) === 100;
}

export const scanAchievable = async (userId: string) => {
    const userParam = await getUserParamAll(userId);
    const newAchvIdList = [];
    for(let i = 0; i <= MAX_ACHIEVEMENT; i++) {
        if(await canAchieve(userId, String(i), userParam)) {
            achieveAchievement(userId, String(i));
            newAchvIdList.push(i);
        }
    }
    return newAchvIdList;
}

export const achieveAchievement = async (userId: string, achvId: string) => {
    await addUserAchievement(userId, achvId, (new Date()).toString());
    await achieve(userId, String(achvId));
}

export const getUserAchievementClient = async (userId: string) => {
    const userAchvMap = await getUserAchievementAll(userId);
    const userParam = await getUserParamAll(userId);
    const res: UserAchievementClient[] = [];
    for (const achvId in userAchvMap) {
        const achv = GAME.ACHIEVEMENT.get(achvId);
        if(achv) {
            res.push({
                achvId: achvId,
                name: achv.name,
                desc: achv.desc,
                achievedAt: userAchvMap.achvId,
                progress: getAchievementProgress(Number(achvId), userParam),
            });
        }
    }
    return res;
}
