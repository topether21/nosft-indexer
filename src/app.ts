import type { FastifyServerOptions } from "fastify";
import fastify from "fastify";
import cors from "@fastify/cors";
import router from "~/plugins/router";
const _importDynamic = new Function("modulePath", "return import(modulePath)");

const app = async (options: FastifyServerOptions = {}) => {
  const app = fastify(options);
  app.register(import("./error"));
  app.register(cors, { origin: "*" });
  app.register(router, { prefix: "/api" });
  const fastifyPrintRoutes = await _importDynamic("fastify-print-routes");
  app.register(fastifyPrintRoutes);
  return app;
};

export default app;
