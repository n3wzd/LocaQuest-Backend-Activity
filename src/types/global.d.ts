import { Request } from 'express';

declare global {
  interface ParamRequest extends Request {
    user?: { userId: string; name: string };
  }

  interface UserData {
    userId: string;
    name: string;
  }
  
  interface UserParam {
    steps: number;
    exp: number;
    distance: number;
  }

  interface Achievement {
    achvId: string;
    name: string;
    desc: string;
  }

  interface UserAchievement {
    achvId: string,
    achievedAt: string | undefined,
  }

  interface UserAchievementListItem extends UserAchievement {
    progress: number,
  }

  interface UserStatus extends UserParam {
    level: number;
    expCurTo: number;
    expNextTo: number;
    achievementList: UserAchievementListItem[],
  }
}

export {};
