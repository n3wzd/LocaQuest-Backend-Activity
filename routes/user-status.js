import express from 'express';
import service from '../services/user-status.js';

const router = express.Router();

router.post('/count-steps', async (req, res, next) => {
    await service.countSteps();
    res.status(200);
});

export default router;
