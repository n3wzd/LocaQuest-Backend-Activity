import { WebSocketServer } from 'ws';
import log from '../utils/log';
import { countSteps, gainDistance, gainExp } from '../services/user-status';
import GAME from '../config/game';
import { updateUserAchievement } from '../services/achievement';

interface Request {
    userId: string,
    distance: number,
    date: string,
}
interface Reponse {
    deltaParam: UserParam,
    newAchvList: UserAchievement[],
}

const wss = new WebSocketServer({ port: Number(process.env.NODEJS_WEBSOCKET_PORT ?? 8000) });

const start = () => wss.on('connection', (ws) => {
    console.log('websocket server is running...');

    ws.on('message', async (message: string) => {
        const data = JSON.parse(message) as Request;
        const userId = data.userId;
        const date = data.date;
        const exp = GAME.EXP_PER_STEPS + data.distance * GAME.EXP_PER_DISTANCE;

        if(data.distance <= 15) {
            await countSteps(userId, date);
            await gainDistance(userId, date, data.distance);
            await gainExp(userId, date, exp);
            const newAchvList = await updateUserAchievement(userId, date);
            const dto: Reponse = {
                deltaParam: {
                    steps: 1,
                    distance: data.distance,
                    exp: exp,
                },
                newAchvList: newAchvList,
            }
            log({level: 'info', message: `200: successfully - ${dto}`, file: '/controllers/socket'});
            ws.send(JSON.stringify(dto));
        } else {
            log({level: 'info', message: `400: failed - invalid distance. userId=${userId}, distance=${data.distance}`, file: '/controllers/socket'});
        }
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
