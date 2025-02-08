import { Request } from 'express';

interface User {
  userId: string;
  name: string;
}

interface ParamRequest extends Request {
  user?: { userId: string; name: string };
}

export default ParamRequest;
