import axios from './axios.js';
import crypto from './crypto.js';
import jwt from 'jsonwebtoken';

let tokenKey = null;

const setTokenKey = async () => {
  await axios.post('/activity/get-login-token-key', { data: crypto.getPublicKey() })
      .then((response) => {
          try {
            tokenKey = crypto.decrypt(response.data.data);
          } catch(e) {
            console.error(e);
          }
      }).catch((error) => {
          console.error('Failed to set tokenKey: ', error);
      });
}

const verify = (token) => {
    jwt.verify(token, tokenKey, (err, decoded) => {
        if (err) {
            console.log('Token is not valid: ', token);
        } else {
            return decoded;
        }
      });
}

export default {
    setTokenKey: setTokenKey,
    verify: verify,
}
