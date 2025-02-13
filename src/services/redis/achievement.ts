
/*import redis from '../../libs/redis';
import REDIS from '../../config/redis';

export const addAchievement = async ({ achvId, name, desc }: Achievement) => {
    await redis.hSet(REDIS.KEY.ACHIEVEMENT(achvId), REDIS.FIELD.ACHIEVEMENT.NAME, name);
    await redis.hSet(REDIS.KEY.ACHIEVEMENT(achvId), REDIS.FIELD.ACHIEVEMENT.DESC, desc);
}

export const getAchievement = async (achvId: string) => {
    return await redis.hGetAll(REDIS.KEY.ACHIEVEMENT(achvId));
}*/
