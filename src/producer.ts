import { pack } from 'msgpackr'
import { Kafka, KafkaConfig } from 'kafkajs';

const kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] }
const kafka = new Kafka(kafkaConfig)
import { Producer } from 'kafkajs';

const producer = kafka.producer()

function getRandomIntInclusive(min:number , max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
async function emitMessage() {
  let serializedAsBuffer = pack(JSON.stringify({ col1: getRandomIntInclusive(0, 100), col2: getRandomIntInclusive(0, 100)}))
  await producer.connect()
  await producer.send({
    topic: 'messages',
    messages: [{ value: serializedAsBuffer }]
  })
}

emitMessage().then(() => {
  producer.disconnect()
})



