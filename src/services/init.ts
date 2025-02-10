import jwt from '../utils/jwt';
import axios from '../utils/axios';
import crypto from '../utils/crypto';
import { initRedis } from '../utils/redis';
import log from '../utils/log';
import { produceUserParamGain } from '../services/produce';
import KAFKA, { KAFKA_SYNC_PERIOD } from '../config/kafka';

interface InitResponse {
    loginTokenKey: string;
    kafkaTopicUserParamGain: string;
}

const initialize = async () => {
    initRedis();
    setInterval(produceUserParamGain, Number(KAFKA_SYNC_PERIOD));
    await axios.post('/activity/init', { rsaPublicKey: crypto.getPublicKey() })
        .then((response) => {
            const data = response.data as InitResponse;
            KAFKA.init(data.kafkaTopicUserParamGain);
            try {
                const base64EncodedKey = crypto.decrypt(data.loginTokenKey);
                jwt.setTokenKey(Buffer.from(base64EncodedKey, 'base64'));
                log({level: 'info', message: 'successfully', file: '/services/init', service: 'initialize'});
            } catch(error) {
                log({level: 'error', message: 'decrypt failed', file: '/services/init', service: 'initialize', error: error});
            }
        }).catch((error) => {
            log({level: 'error', message: 'axios failed', file: '/services/init', service: 'initialize', error: error});
        });
}

export default initialize;
