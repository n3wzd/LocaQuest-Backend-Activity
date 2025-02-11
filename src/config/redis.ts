const KEY_BASE_USER_STATUS = "USER_STATUS";

const USER_STATUS = (userId: string) => KEY_BASE_USER_STATUS + userId;

export default { 
    KEY: {
        USER_DELTA_STEPS: "USER_DELTA_STEPS",
        USER_DELTA_DISTANCE: "USER_DELTA_DISTANCE",
        USER_DELTA_EXP: "USER_DELTA_EXP",
        USER_STATUS: USER_STATUS,
    },
    FIELD: {
        USER_STATUS: {
            STEPS: "STEPS",
            DISTANCE: "DISTANCE",
            EXP: "EXP",
        }
    }
}
