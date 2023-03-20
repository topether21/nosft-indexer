import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { config } from "~/config";
import app from "~/app";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async () => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    const server = await app({
      logger: {
        transport: {
          target: "@fastify/one-line-logger",
        },
      },
    });

    await server.listen({
      host: config.hostname,
      port: config.port,
    });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening on ${port}`);
  } catch (err) {
    console.log(`[Error]: ${err}`);
    server.log.error(err);
    process.exit(1);
  }
};
start();
