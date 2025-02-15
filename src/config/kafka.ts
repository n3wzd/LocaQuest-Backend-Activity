const topics: Record<string, string | null> = {
    USER_PARAM_GAIN: null
}

const KAFKA_SYNC_PERIOD = 20000

const init = (userParamGain: string) => {
    topics.USER_PARAM_GAIN = userParamGain;
}

export default { init: init, topics: topics }
export { KAFKA_SYNC_PERIOD }
