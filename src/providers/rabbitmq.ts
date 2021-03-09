import amqp from 'amqplib'

const { URI } = process.env

let channel

const microservice = async (queue: string) => {
  try {
    const connection = await amqp.connect(URI)
    channel = await connection.createChannel()
    await channel.assertQueue(queue)
  } catch (err) {
    throw new Error(err)
  }
}

export { microservice, channel }
