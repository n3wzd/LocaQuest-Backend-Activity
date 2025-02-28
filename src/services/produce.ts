import kafka from "../libs/kafka";
import KAFKA from "../config/kafka";
import log from "../utils/log";
import { flushAndRetrieveAllData } from "./redis/user-status-delta";

export const produceUserParamGain = async () => {
    const topic = KAFKA.topics.USER_PARAM_GAIN;
    if(topic === null) {
      log({level: 'error', message: 'topic is null', file: '/services/produce', service: 'produceUserParamGain'});
      return;
    }

    const userMap = await flushAndRetrieveAllData();
    try {
      const messageList: string[] = [];
      userMap.forEach((value, key) => {
        const [ userId, date ] = key.split(':');
        const message = {
          userId: userId,
          date: date,
          steps: value.steps,
          distance: value.distance,
          exp: value.exp,
        }
        messageList.push(JSON.stringify(message));
      });
      await kafka.produce(topic, messageList);
      log({level: 'info', message: `successfully: ${messageList.toString()}`, file: '/services/produce', service: 'produceUserParamGain'});
    } catch (error) {
      log({level: 'error', message: 'failed', file: '/services/produce', service: 'produceUserParamGain', error: error});
    }
}
