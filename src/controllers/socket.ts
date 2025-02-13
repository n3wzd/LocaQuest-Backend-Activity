import { WebSocketServer } from 'ws';
import log from '../utils/log';
import { countSteps, gainDistance, gainExp } from '../services/user-status';
import GAME from '../config/game';
import { scanAchievable } from '../services/achievement';

interface Request {
    userId: string,
    distance: number,
}

const wss = new WebSocketServer({ port: Number(process.env.NODEJS_WEBSOCKET_PORT ?? 8000) });

const start = () => wss.on('connection', (ws) => {
    console.log('websocket server is running...');

    ws.on('message', async (message: string) => {
        const data = JSON.parse(message) as Request;
        const userId = data.userId;
        const deltaDist = data.distance;
        const deltaExp = GAME.EXP_PER_STEPS + data.distance * GAME.EXP_PER_DISTANCE;
        await countSteps(userId);
        await gainDistance(userId, deltaDist);
        await gainExp(userId, deltaExp);
        const newAchvIdList = await scanAchievable(userId);

        const res = {
            steps: 1,
            distance: deltaDist,
            exp: deltaExp,
            achievementIdList: newAchvIdList,
        }
        ws.send(JSON.stringify(res));
        log({level: 'info', message: '200: successfully', file: '/controllers/socket'});
    });

    ws.on('close', () => {
        console.log('websocket server is closed.');
    });

    ws.on('error', (error) => {
        log({level: 'info', message: `websocket failed: ${error}`, file: '/controllers/socket'});
    });
});

export default {
    start: start,
}
