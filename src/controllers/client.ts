import express from 'express';
import { getExpLimitList } from '../utils/game';
import GAME from '../config/game';
import log from '../utils/log';
import { getUserStatus } from '../api/user-status';
import { getUserParamAll } from '../services/redis/user-status';
import { getUserAchievementClient } from '../services/achievement';

const router = express.Router();

router.post('/init', async (req: ParamRequest, res) => {
    if(req.user) {
        const userId = req.user.userId;
        if(await getUserStatus(userId)) {
            const userStatistic = await getUserParamAll(userId);
            const userAchv = await getUserAchievementClient(userId);
            const dto = {
                gameData: {
                    maxLevel: GAME.MAX_LEVEL,
                    expLimitList: getExpLimitList(),
                },
                userStatus: {
                    userStatistic: userStatistic,
                    achievementList: userAchv,
                }
            }
            log({level: 'info', message: '200: successfully', file: '/controllers/client', service: '/init', req: req});
            res.status(200).send(dto);
        } else {
            log({level: 'info', message: '500: core server failed', file: '/controllers/user-status', service: '/count-steps', req: req});
            res.status(500).send();
        }
    } else {
        log({level: 'info', message: '400: failed', file: '/controllers/user-status', service: '/count-steps', req: req});
        res.status(400).send();
    }
});

export default router;
