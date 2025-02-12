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

  interface Achievement {
    achvId: number;
    name: string;
    desc: string;
    progress: number;
    achievedAt: string;
  }

  type HttpResopnseCallback = (data: any, status: number) => void;
}

export {};
