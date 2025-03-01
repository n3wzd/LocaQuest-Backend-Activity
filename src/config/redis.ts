const USER_STATUS = (userId: string) => "USER_STATUS_" + userId;
const USER_ACHIEVEMENT = (userId: string) => "USER_ACHIEVEMENT_" + userId;
const ACHIEVEMENT = (achvId: string) => "ACHIEVEMENT_" + achvId;

export default { 
    KEY: {
        USER_DELTA_STEPS: "USER_DELTA_STEPS",
        USER_DELTA_DISTANCE: "USER_DELTA_DISTANCE",
        USER_DELTA_EXP: "USER_DELTA_EXP",
        USER_DELTA_CLIENT: "USER_DELTA_CLIENT",
        USER_STATUS: USER_STATUS,
        USER_ACHIEVEMENT: USER_ACHIEVEMENT,
    },
    FIELD: {
        USER_STATUS: {
            STEPS: "STEPS",
            DISTANCE: "DISTANCE",
            EXP: "EXP",
        },
    }
}
