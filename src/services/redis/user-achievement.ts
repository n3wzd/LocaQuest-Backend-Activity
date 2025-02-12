
import redis from '../../libs/redis';
import REDIS from '../../config/redis';

const addAchievement = async (userId: string, achvId: string) => {
    await redis.hSet(REDIS.KEY.USER_ACHIEVEMENT(userId), achvId, "1");
}

const hasAchievement = async (userId: string, achvId: string) => {
    return await redis.hGet(REDIS.KEY.USER_ACHIEVEMENT(userId), achvId) ? true : false;
}

export default { 
    addAchievement, hasAchievement
};
