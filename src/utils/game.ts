import GAME from "../config/game";

export const getLevel = (exp: number) => {
  const a = GAME.EXP_PARAM_A;
  const b = GAME.EXP_PARAM_B;
  const c = GAME.EXP_PARAM_C - exp;

  const d = b * b - 4 * a * c;
  if (d < 0) {
    return 1;
  }
  return Math.floor((-b + Math.sqrt(d)) / (2 * a)) + 1;
}

export const getExpLimit = (level: number) => {
  const a = GAME.EXP_PARAM_A;
  const b = GAME.EXP_PARAM_B;
  const c = GAME.EXP_PARAM_C;
  
  level--;
  return Math.floor(a * Math.pow(level, 2) + b * level + c);
}

export const getExpCurTo = (exp: number) => getExpLimit(getLevel(exp));

export const getExpNextTo = (exp: number) => {
  const level = getLevel(exp);
  if(GAME.MAX_LEVEL === level) {
    return 0;
  }
  const nextExp = getExpLimit(level + 1);
  return nextExp - exp;
}

export const canLevelUp = (exp1: number, exp2: number) => {
  return getLevel(exp1) < getLevel(exp2);
}

export const getExpProgress = (exp: number) => {
  const expCurTo = getExpCurTo(exp);
  const expNextTo = getExpNextTo(exp);
  return expNextTo === 0 ? 100 : 
    (exp - expCurTo) / (exp + expNextTo - expCurTo) * 100;
}

export const getAchievementProgress = (achvId: number, userParam: UserParam) => {
  let a = 0, b = 1;

  switch (achvId) {
    case 0:  a = userParam.exp; b = 10000; break;
    case 1:  a = userParam.exp; b = 100000; break;
    case 2:  a = userParam.exp; b = 500000; break;
    case 3:  a = userParam.exp; b = 1000000; break;
    case 4:  a = userParam.exp; b = 2500000; break;
    case 5:  a = userParam.exp; b = 5000000; break;
    case 6:  a = userParam.exp; b = 10000000; break;
    case 7:  a = userParam.exp; b = 25000000; break;
    case 8:  a = userParam.exp; b = 100000000; break;

    case 9:  a = userParam.steps; b = 1000; break;
    case 10: a = userParam.steps; b = 10000; break;
    case 11: a = userParam.steps; b = 42195; break;
    case 12: a = userParam.steps; b = 50000; break;
    case 13: a = userParam.steps; b = 100000; break;
    case 14: a = userParam.steps; b = 500000; break;
    case 15: a = userParam.steps; b = 1000000; break;
    case 16: a = userParam.steps; b = 10000000; break;

    case 17: a = userParam.distance; b = 1000; break;
    case 18: a = userParam.distance; b = 5000; break;
    case 19: a = userParam.distance; b = 10000; break;
    case 20: a = userParam.distance; b = 25000; break;
    case 21: a = userParam.distance; b = 50000; break;
    case 22: a = userParam.distance; b = 100000; break;
    case 23: a = userParam.distance; b = 500000; break;
    case 24: a = userParam.distance; b = 1000000; break;
    case 25: a = userParam.distance; b = 5000000; break;
    case 26: a = userParam.distance; b = 40009000; break;

    default:
      return 0;
  }
  return a >= b ? 100 : Math.floor((a / b) * 100);
}
