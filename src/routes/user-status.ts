import express from 'express';
import service from '../services/user-status';
import ParamRequest from '../types/request';

const router = express.Router();

router.post('/count-steps', async (req: ParamRequest, res, next) => {
    if(req.user) {
        await service.countSteps(req.user.userId);
        res.status(200).send();
    } else {
        console.error("count-steps: no user data", req);
        res.status(400).send();
    }
});

export default router;
