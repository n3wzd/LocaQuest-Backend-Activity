import log from '../utils/log';
import http from '../utils/http';
import { addUserAchievement } from '../services/redis/user-achievement';
import { setUserParamAll } from '../services/redis/user-status';

const filePath = '/api/user-status';

const errorHandelr = (error: any, service: string) => {
    log({level: 'error', message: `axios failed: ${error}`, file: filePath, service: service});
}

export const achieve = async (userId: string, achvId: string) => {
    try {
        await http.post({
            url: "/user-status/achieve", 
            params: { achvId: achvId, userId: userId },
        });
        log({level: 'info', message: 'successfully', file: filePath, service: 'achieve'});
    } catch(error) {
        errorHandelr(error, 'achieve');
    }
}

export const getUserStatus = async (userId: string) => {
    interface UserStatistic extends UserParam {
        userId: string;
    }
    interface Response {
        userStatistic: UserStatistic;
        achievementList: UserAchievement[];
    }
    try {
        const response = await http.get({ url: `/user-status/all/${userId}` });
        const data: Response = response.data;
        
        for(const achv of data.achievementList) {
            if(achv.achievedAt) {
                await addUserAchievement(userId, achv.achvId, achv.achievedAt);
            }
        }
        await setUserParamAll(userId, {
            exp: data.userStatistic.exp,
            steps: data.userStatistic.steps, 
            distance:  data.userStatistic.distance
        });
        log({level: 'info', message: 'successfully', file: filePath, service: 'getUserStatus'});
        return true;
    } catch(error) {
        errorHandelr(error, 'getUserStatus');
        return false;
    }
}
