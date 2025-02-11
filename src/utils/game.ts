import GAME from "../config/game";

const getLevel = (exp: number): number => {
    const a = GAME.EXP_PARAM_A;
    const b = GAME.EXP_PARAM_B;
    const c = GAME.EXP_PARAM_C - exp;

    const d = b * b - 4 * a * c;
    if (d < 0) {
      throw new Error("Invalid EXP value");
    }
    
    return Math.floor((-b + Math.sqrt(d)) / (2 * a)) + 1;
}

const getExpLimit = (level: number): number => {
    const a = GAME.EXP_PARAM_A;
    const b = GAME.EXP_PARAM_B;
    const c = GAME.EXP_PARAM_C;
    
    level--;
    return Math.floor(a * Math.pow(level, 2) + b * level + c);
}

const getExpLimitList = (): number[] => {
    const expLimitList: number[] = [0];
    const maxLevel = GAME.EXP_PARAM_A;
    
    for (let i = 1; i < maxLevel; i++) {
      expLimitList.push(getExpLimit(i));
    }
    
    return expLimitList;
}

const getAchievementProgress = (achvId: number, userParam: UserParam): number => {
    let a = 0, b = 1;

    switch (achvId) {
      case 0:
        a = userParam.exp;
        b = 500;
        break;
      case 1:
        a = userParam.exp;
        b = 1000;
        break;
      case 2:
        a = userParam.exp;
        b = 10000;
        break;
      case 3:
        a = userParam.steps;
        b = 10000;
        break;
      case 4:
        a = userParam.steps;
        b = 50000;
        break;
      case 5:
        a = userParam.distance;
        b = 100000;
        break;
      case 6:
        a = userParam.distance;
        b = 500000;
        break;
      default:
        break;
    }
    return a >= b ? 100 : Math.floor((a / b) * 100);
}

export { getLevel, getExpLimit, getExpLimitList }
