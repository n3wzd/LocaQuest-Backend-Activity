const achievements: Map<String, Achievement> = new Map();

const init = (achvList: Achievement[]) => {
    for(const achv of achvList) {
        achievements.set(achv.achvId, achv);
    }
}

export default {
    MAX_LEVEL: 100,
    EXP_PARAM_A: 100,
    EXP_PARAM_B: 500,
    EXP_PARAM_C: 1000,
    EXP_PER_STEPS: 10,
    EXP_PER_DISTANCE: 10,
    ACHIEVEMENT: achievements,
    init: init,
}
