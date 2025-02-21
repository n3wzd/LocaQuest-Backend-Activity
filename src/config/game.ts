const achievements: Achievement[] = [];

const init = (achvList: Achievement[]) => {
    achvList.sort((a, b) => Number(a.achvId) - Number(b.achvId));
    for(const achv of achvList) {
        achievements.push(achv);
    }
}

export default {
    MAX_LEVEL: 100,
    EXP_PARAM_A: 100,
    EXP_PARAM_B: 500,
    EXP_PARAM_C: 0,
    EXP_PER_STEPS: 10,
    EXP_PER_DISTANCE: 10,
    ACHIEVEMENT: achievements,
    init: init,
}
