import { WebSocketServer } from 'ws';
import log from '../utils/log';
import { countSteps, createUserStatusData, gainDistance, gainExp } from '../services/user-status';
import GAME from '../config/game';
import { updateUserAchievement } from '../services/achievement';

interface Request {
    userId: string,
    distance: number,
}
interface Reponse {
    userStatus: UserStatus,
    newAchvIdList: number[],
}

const wss = new WebSocketServer({ port: Number(process.env.NODEJS_WEBSOCKET_PORT ?? 8000) });

const start = () => wss.on('connection', (ws) => {
    console.log('websocket server is running...');

    ws.on('message', async (message: string) => {
        const data = JSON.parse(message) as Request;
        const userId = data.userId;
        await countSteps(userId);
        await gainDistance(userId, data.distance);
        await gainExp(userId, GAME.EXP_PER_STEPS + data.distance * GAME.EXP_PER_DISTANCE);
        const newAchvIdList = await updateUserAchievement(userId);

        const dto: Reponse = {
            userStatus: await createUserStatusData(userId),
            newAchvIdList: newAchvIdList,
        }
        log({level: 'info', message: '200: successfully', file: '/controllers/socket'});
        ws.send(JSON.stringify(dto));
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
