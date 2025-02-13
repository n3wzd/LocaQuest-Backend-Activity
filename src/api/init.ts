import jwt from '../libs/jwt';
import crypto from '../libs/crypto';
import log from '../utils/log';
import KAFKA from '../config/kafka';
import GAME from '../config/game';
import http from '../utils/http';

const filePath = '/api/init';

const errorHandelr = (error: any, service: string) => {
    log({level: 'error', message: `axios failed: ${error}`, file: filePath, service: service});
}

export const initialize = async () => {
    interface Response {
        loginTokenKey: string;
        kafkaTopicUserParamGain: string;
        achievementList: Achievement[];
    }
    try {
        const response = await http.post({
            url: "/activity/init", 
            params: { rsaPublicKey: crypto.getPublicKey() },
        });
        const data: Response = response.data;

        KAFKA.init(data.kafkaTopicUserParamGain);
        GAME.init(data.achievementList);
        try {
            const base64EncodedKey = crypto.decrypt(data.loginTokenKey);
            jwt.setTokenKey(Buffer.from(base64EncodedKey, 'base64'));
            log({level: 'info', message: 'successfully', file: filePath, service: 'initialize'});
        } catch(error) {
            log({level: 'error', message: 'decrypt failed', file: filePath, service: 'initialize', error: error});
        }
    } catch(error) {
        errorHandelr(error, 'initialize');
    }
}
