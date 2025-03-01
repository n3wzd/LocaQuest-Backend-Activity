import { Mutex } from 'async-mutex';

export default {
    createMutex: () => new Mutex()
}
