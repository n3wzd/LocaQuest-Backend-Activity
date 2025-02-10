import jwt, { JwtPayload } from 'jsonwebtoken';
import log from './log';

let tokenKey: Buffer<ArrayBuffer> | null = null;

const setTokenKey = (key: Buffer<ArrayBuffer>) => {
  tokenKey = key;
}

const verify = async (token: string) => {
  if(tokenKey) {
    return await jwt.verify(token, tokenKey, { algorithms: ['HS256'] });
  } else {
    return null;
  }
}

export default {
    setTokenKey: setTokenKey,
    verify: verify,
}
