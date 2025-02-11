import { Kafka, Message } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.NODEJS_KAFKA_CLIENT_ID,
  brokers: [process.env.NODEJS_KAFKA_BROKERS ?? ""],
});

const producer = kafka.producer();

const produce = async (topic: string, values: string[]) => {
    try {
        await producer.connect();
        const messages: Message[] = values.map(value => ({ value }));
        await producer.send({
            topic: topic,
            messages,
        });
    } catch (error) {
        throw error;
    } finally {
        await producer.disconnect();
    }
};

export default { produce: produce };
