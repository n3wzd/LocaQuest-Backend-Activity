import express from 'express';
import log from '../utils/log';
import { getUserStatus } from '../api/user-status';
import { createUserStatusData } from '../services/user-status';
import GAME from '../config/game';

const router = express.Router();

router.post('/init', async (req: ParamRequest, res) => {
    interface Response {
        achievementList: Achievement[],
        userStatus: UserStatus,
    }
    if(req.user) {
        const userId = req.user.userId;
        if(await getUserStatus(userId)) {
            const dto: Response = {
                achievementList: GAME.ACHIEVEMENT,
                userStatus: await createUserStatusData(userId),
            }
            log({level: 'info', message: '200: successfully', file: '/controllers/client', service: '/init', req: req});
            res.status(200).send(dto);
        } else {
            log({level: 'info', message: '500: core server failed', file: '/controllers/client', service: '/init', req: req});
            res.status(500).send("초기화 실패!");
        }
    } else {
        log({level: 'info', message: '400: failed', file: '/controllers/client', service: '/init', req: req});
        res.status(400).send("초기화 실패!");
    }
});

export default router;
