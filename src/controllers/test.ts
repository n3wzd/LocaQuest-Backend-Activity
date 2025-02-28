import express from 'express';
import { userStatusStart } from '../api/user-status';
import GAME from '../config/game';
import { countSteps, gainDistance, gainExp } from '../services/user-status';

const router = express.Router();

router.post('/client/init', async (req, res) => {
    interface Request {
        userId: string
        date: string,
    }
    interface Response {
        achievementList: Achievement[],
        userAchievementList: UserAchievement[],
        userStatisticList: UserStatistic[],
        attended: boolean,
    }
    if(req) {
        const data = req.body as Request;
        const userId = req.body.userId;
        const output = await userStatusStart(userId, data.date);
        if(output) {
            const dto: Response = {
                achievementList: GAME.ACHIEVEMENT,
                ...output,
            }
            res.status(200).send(dto);
        } else {
            res.status(500).send("초기화 실패!");
        }
    } else {
        res.status(400).send("초기화 실패!");
    }
});

router.post('/gain-user-param', async (req, res) => {
    interface Request {
        userId: string
        date: string,
        distance: number,
    }
    const data = req.body as Request;
    const userId = data.userId;
    const date = data.date;
    const exp = GAME.EXP_PER_STEPS + data.distance * GAME.EXP_PER_DISTANCE;

    await countSteps(userId, date);
    await gainDistance(userId, date, data.distance);
    await gainExp(userId, date, exp);
    res.status(200).send();
});

export default router;
