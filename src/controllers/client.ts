import express from 'express';
import { getExpLimitList } from '../utils/game';
import GAME from '../config/game';
import log from '../utils/log';

const router = express.Router();

router.post('/init', async (req, res, next) => {
    const dto = {
        maxLevel: GAME.MAX_LEVEL,
        expLimitList: getExpLimitList()
    }
    log({level: 'info', message: '200: successfully', file: '/routes/client', service: '/init', req: req});
    res.status(200).send(dto);
});

export default router;
