import log from '../utils/log';
import http from '../utils/http';
import { addUserAchievement } from '../services/redis/user-achievement';
import { setUserParamAll } from '../services/redis/user-status';

const filePath = '/api/user-status';

const errorHandler = (error: any, service: string) => {
    log({level: 'error', message: `axios failed: ${error}`, file: filePath, service: service});
}

export const achieve = async (userId: string, achvId: string, achievedAt: string) => {
    try {
        await http.post({
            url: "/user-status/achieve", 
            params: { achvId: achvId, userId: userId, achievedAt: achievedAt },
        });
        log({level: 'info', message: 'successfully', file: filePath, service: 'achieve'});
    } catch(error) {
        errorHandler(error, 'achieve');
    }
}

export const getUserStatus = async (userId: string) => {
    interface Response {
        userStatisticList: UserStatistic[];
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
        let expSum = 0, stepSum = 0, distanceSum = 0;
        for(const stat of data.userStatisticList) {
            expSum += stat.exp;
            stepSum += stat.steps;
            distanceSum += stat.distance;
        }
        await setUserParamAll(userId, {
            exp: expSum,
            steps: stepSum, 
            distance: distanceSum
        });
        log({level: 'info', message: 'successfully', file: filePath, service: 'getUserStatus'});
        return true;
    } catch(error) {
        errorHandler(error, 'getUserStatus');
        return false;
    }
}
