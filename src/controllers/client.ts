import express from 'express';
import log from '../utils/log';
import { userStatusStart } from '../api/user-status';
import GAME from '../config/game';

const router = express.Router();

router.post('/start', async (req: ParamRequest, res) => {
    interface Request {
        date: string,
    }
    interface Response {
        achievementList: Achievement[],
        userAchievementList: UserAchievement[],
        userStatisticList: UserStatistic[],
        isAttend: boolean,
    }
    if(req.user) {
        const userId = req.user.userId;
        const data = req.body as Request;
        const output = await userStatusStart(userId, data.date);
        if(output) {
            const dto: Response = {
                achievementList: GAME.ACHIEVEMENT,
                ...output,
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
