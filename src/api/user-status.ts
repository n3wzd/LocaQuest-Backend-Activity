import log from '../utils/log';
import http from '../utils/http';
import userAchvService from '../services/redis/user-achievement';
import userStatusService from '../services/redis/user-status';

const filePath = '/api/user-status';

const errorHandelr = (data: any, status: number, service: string) => {
    log({level: 'error', message: `axios failed ${status}: ${data}`, file: filePath, service: service});
}

export const achieve = async (userId: string, achvId: string) => {
    http.post({
        url: "/user-status/achieve", 
        params: { achvId: achvId, userId: userId },
        thenCallback: () => { log({level: 'info', message: 'successfully', file: filePath, service: 'achieve'}); },
        errorCallback: (data, status) => errorHandelr(data, status, 'achieve'),
    });
}

export const getUserAchievements = async (userId: string) => {
    const callback = async (data: Achievement[]) => {
        for(const achv of data) {
            await userAchvService.addAchievement(userId, String(achv.achvId));
        }
        log({level: 'info', message: 'successfully', file: filePath, service: 'getUserAchievements'});
    }
    http.get({
        url: `/user-status/achievements/${userId}`, 
        thenCallback: callback,
        errorCallback: (data, status) => errorHandelr(data, status, 'getUserAchievements'),
    });
}

export const getUserStatistics = async (userId: string) => {
    const callback = async (data: UserParam) => {
        await userStatusService.setParam(userId, "EXP", String(data.exp));
        await userStatusService.setParam(userId, "STEPS", String(data.steps));
        await userStatusService.setParam(userId, "DISTANCE", String(data.distance));
        log({level: 'info', message: 'successfully', file: filePath, service: 'getUserStatistics'});
    }
    http.get({
        url: `/user-status/statistics/${userId}`, 
        thenCallback: callback,
        errorCallback: (data, status) => errorHandelr(data, status, 'getUserStatistics'),
    });
}
