import express from 'express';
import userService from '../services/user-status-delta';
import log from '../utils/log';

const router = express.Router();

router.post('/count-steps', async (req: ParamRequest, res) => {
    if(req.user) {
        await userService.countSteps(req.user.userId);
        await userService.gainDistance(req.user.userId, req.body.distance);
        log({level: 'info', message: '200: successfully', file: '/routes/user-status', service: '/count-steps', req: req});
        res.status(200).send();
    } else {
        log({level: 'info', message: '400: failed', file: '/routes/user-status', service: '/count-steps', req: req});
        res.status(400).send();
    }
});

export default router;
