import axios from './axios';
import crypto from './crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';

let tokenKey: Buffer<ArrayBuffer> | null = null;

const setTokenKey = async () => {
  await axios.post('/activity/get-login-token-key', { data: crypto.getPublicKey() })
      .then((response) => {
          try {
            const base64EncodedKey = crypto.decrypt(response.data.data);
            tokenKey = Buffer.from(base64EncodedKey, 'base64');
          } catch(e) {
            console.error(e);
          }
      }).catch((error) => {
          console.error('Failed to set tokenKey: ', error);
      });
}

const verify = (token: string): JwtPayload | undefined => {
    let res;
    if(tokenKey) {
      jwt.verify(token, tokenKey, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            console.log(`Token is not valid: ${token} => ${err}`);
        } else {
          if(typeof decoded !== 'string') {
            res = decoded as JwtPayload;
          } else {
            console.log(`Invalid Token: ${token} => decoded is string`);
          }
        }
      });
    }
    return res;
}

export default {
    setTokenKey: setTokenKey,
    verify: verify,
}
