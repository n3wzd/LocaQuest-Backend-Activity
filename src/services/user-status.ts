
import { setUserSteps, getUserSteps } from '../utils/redis';

const countSteps = async (userId: string) => {
    const steps = await getUserSteps(userId);
    await setUserSteps(userId, String(steps + 1));
    console.log(`${userId} steps: ${steps + 1}`);
}

export default { 
    countSteps: countSteps
};
