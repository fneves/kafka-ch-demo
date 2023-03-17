import { Consumer, EachMessagePayload, KafkaConfig, Kafka } from 'kafkajs';
import { unpack } from 'msgpackr';

const kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] }
const kafka = new Kafka(kafkaConfig)
const consumer = kafka.consumer({ groupId: 'messages-js-1' })


async function consume() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'messages', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        const data = JSON.parse(unpack(message.value))
        console.log(data)
      }
    },
  })
}

consume()
