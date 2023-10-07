import * as amqp from "amqplib/callback_api.js";

type ConnectionCallback = (
  error: Error | null,
  connection: amqp.Connection
) => void;
type ChannelCallback = (error: Error | null, channel: amqp.Channel) => void;

// Connect to RabbitMQ
amqp.connect(
  "amqp://localhost",
  (error0: Error | null, connection: amqp.Connection) => {
    if (error0) {
      throw error0;
    }

    // Create a channel
    connection.createChannel((error1: Error | null, channel: amqp.Channel) => {
      if (error1) {
        throw error1;
      }

      var queue = "hello";
      var msg = "Hello world";

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  }
);
