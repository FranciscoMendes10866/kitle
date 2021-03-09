import 'dotenv/config'

import { microservice, channel } from '@providers/rabbitmq'

const { QUEUE } = process.env;

(async () => {
  try {
    await microservice(QUEUE)
    channel.consume(QUEUE, async (msg) => {
      console.log({ message: JSON.parse(msg.content.toString()) })
      channel.ack(msg)
    }, { noAck: false })
  } catch (err) {
    console.log(err)
  }
})()
