
import redis from '../../libs/redis';
import REDIS from '../../config/redis';

export const addUserAchievement = async (userId: string, achvId: string, achievedAt: string) => {
    await redis.hSet(REDIS.KEY.USER_ACHIEVEMENT(userId), achvId, achievedAt);
}

export const hasUserAchievement = async (userId: string, achvId: string) => {
    return await redis.hGet(REDIS.KEY.USER_ACHIEVEMENT(userId), achvId) ? true : false;
}

export const getUserAchievementAll = async (userId: string) => {
    return await redis.hGetAll(REDIS.KEY.USER_ACHIEVEMENT(userId));
}
