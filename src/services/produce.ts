import kafka from "../libs/kafka";
import KAFKA from "../config/kafka";
import log from "../utils/log";
import { getDeltaStepsAll, getDeltaDistanceAll, getDeltaExpAll, delDeltaSteps, delDeltaDistance, delDeltaExp } from "./redis/user-status-delta";

export const produceUserParamGain = async () => {
    const topic = KAFKA.topics.USER_PARAM_GAIN;
    if(topic === null) {
      log({level: 'error', message: 'topic is null', file: '/services/produce', service: 'produceUserParamGain'});
      return;
    }

    const userMap = new Map<string, UserParam>();
    const stepsMap = await getDeltaStepsAll();
    const distanceMap = await getDeltaDistanceAll();
    const expMap = await getDeltaExpAll();
    try {
      const updateUserMap = (map: Record<string, string>, key: keyof UserParam) => {
        for (const userId in map) {
          if (!userMap.has(userId)) {
            userMap.set(userId, { steps: 0, exp: 0, distance: 0 });
          }
          const param = userMap.get(userId) as UserParam;
          param[key] = Number(map[userId]);
          userMap.set(userId, param);
        }
      };
      updateUserMap(stepsMap, 'steps');
      updateUserMap(distanceMap, 'distance');
      updateUserMap(expMap, 'exp');

      const messageList: string[] = [];
      userMap.forEach((value, key) => {
        const message = {
          userId: key,
          steps: value.steps,
          distance: value.distance,
          exp: value.exp,
        }
        messageList.push(JSON.stringify(message));
      });
      console.debug(messageList);
      await kafka.produce(topic, messageList)
      await delDeltaSteps();
      await delDeltaDistance();
      await delDeltaExp();
      log({level: 'info', message: 'successfully', file: '/services/produce', service: 'produceUserParamGain'});
    } catch (error) {
      log({level: 'error', message: 'failed', file: '/services/produce', service: 'produceUserParamGain', error: error});
    }
}
