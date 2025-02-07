import pool from '../utils/database.js';
import redis from '../utils/redis.js';

const STEPS_KEY_BASE = 'steps';

const countSteps = async () => {
    /*pool.query('SELECT * FROM users')
        .then(([rows, fields]) => {
            console.log(rows);
        })
        .catch(err => {
            console.error(err);
        });*/
    redis.get();
    console.log("CNT!!!!");
}

export default { 
    countSteps: countSteps
};
