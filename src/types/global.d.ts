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
}

export {};
