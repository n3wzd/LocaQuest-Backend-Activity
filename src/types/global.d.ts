import { Request } from 'express';

declare global {
  interface User {
    userId: string;
    name: string;
  }

  interface ParamRequest extends Request {
    user?: { userId: string; name: string };
  }
  
  interface UserParam {
    steps: number;
    exp: number;
    distance: number;
  }

  interface UserStatistic extends UserParam {
    userId: string;
  }

  interface Achievement {
    achvId: string;
    name: string;
    desc: string;
  }

  interface UserAchievement extends Achievement {
    achievedAt: string;
  }

  interface UserAchievementClient extends UserAchievement {
    progress: number;
  }
}

export {};
