import "dotenv";
import "./database/connection";
import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyJWT from "fastify-jwt";
import cluster from "cluster";
import { cpus } from "os";
import routes from "./routes";

const port = process.env.PORT || 5000;
const host = "0.0.0.0";
const secret = process.env.ADMIN_SECRET || "devzero";

if (cluster.isPrimary) {
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Process ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const server = fastify({ logger: process.env.ENVIRONMENT === "development" });

  server.register(fastifyCors, {
    origin: "*",
    methods: ["GET, POST", "PUT", "DELETE", "PATCH"],
  });
  server.register(fastifyJWT, { secret });
  server.register(routes);

  server.listen(port, host, async (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`server listening on ${address}`);
  });
}
