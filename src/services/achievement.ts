import userStatusService from './redis/user-status';
import userAchvService from './redis/user-achievement';
import { achieve } from '../api/user-status';
import { getAchievementProgress } from '../utils/game';

const canAchieve = async (userId: string, achvId: string, userParam: UserParam) => {
    return await userAchvService.hasAchievement(userId, achvId) && getAchievementProgress(Number(achvId), userParam)
}

export const scanAchievable = async (userId: string) => {
    const userParam = {
        exp: await userStatusService.getParam(userId, "EXP"),
        steps: await userStatusService.getParam(userId, "STEPS"),
        distance: await userStatusService.getParam(userId, "DISTANCE"),
    }
    for(let i = 0; i <= 7; i++) {
        if(await canAchieve(userId, String(i), userParam)) {
            achieve(userId, String(i));
        }
    }
}
