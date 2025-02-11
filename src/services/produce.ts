import kafka from "../libs/kafka";
import KAFKA from "../config/kafka";
import log from "../utils/log";
import userService from "./user-status-delta";

interface Param {
  steps: number;
  exp: number;
  distance: number;
}

export const produceUserParamGain = async () => {
    const topic = KAFKA.topics.USER_PARAM_GAIN;
    if(topic === null) {
      log({level: 'error', message: 'topic is null', file: '/services/produce', service: 'produceUserParamGain'});
      return;
    }

    const userMap = new Map<string, Param>();
    const stepsMap = await userService.getStepsAll();
    const distanceMap = await userService.getDistanceAll();
    const expMap = await userService.getExpAll();
    try {
      const updateUserMap = (map: Record<string, string>, key: keyof Param) => {
        for (const userId in map) {
          if (!userMap.has(userId)) {
            userMap.set(userId, { steps: 0, exp: 0, distance: 0 });
          }
          const param = userMap.get(userId) as Param;
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
      await kafka.produce(topic, messageList)
      await userService.delSteps();
      await userService.delDistance();
      await userService.delExp();
      log({level: 'info', message: 'successfully', file: '/services/produce', service: 'produceUserParamGain'});
    } catch (error) {
      log({level: 'error', message: 'failed', file: '/services/produce', service: 'produceUserParamGain', error: error});
    }
}
