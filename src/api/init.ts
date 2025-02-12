import jwt from '../libs/jwt';
import crypto from '../libs/crypto';
import log from '../utils/log';
import KAFKA from '../config/kafka';
import http from '../utils/http';

const filePath = '/api/init';

const errorHandelr = (data: any, status: number, service: string) => {
    log({level: 'error', message: `axios failed ${status}: ${data}`, file: filePath, service: service});
}

export const initialize = async () => {
    interface InitResponse {
        loginTokenKey: string;
        kafkaTopicUserParamGain: string;
    }
    const callback = (data: InitResponse) => {
        KAFKA.init(data.kafkaTopicUserParamGain);
        try {
            const base64EncodedKey = crypto.decrypt(data.loginTokenKey);
            jwt.setTokenKey(Buffer.from(base64EncodedKey, 'base64'));
            log({level: 'info', message: 'successfully', file: filePath, service: 'initialize'});
        } catch(error) {
            log({level: 'error', message: 'decrypt failed', file: filePath, service: 'initialize', error: error});
        }
    }
    http.post({
        url: "/activity/init", 
        params: { rsaPublicKey: crypto.getPublicKey() },
        thenCallback: callback,
        errorCallback: (data, status) => errorHandelr(data, status, 'initialize'),
    });
}
