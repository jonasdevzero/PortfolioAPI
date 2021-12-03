import { FastifyPluginOptions, FastifyReply, FastifyInstance } from "fastify"

export default function routes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", (req, reply) => { reply.status(200).send("OK") })

    done()
}