import { FastifyPluginOptions, FastifyInstance } from "fastify"

import projectRoutes from "./projectRoutes"
import skillRoutes from "./skillRoutes"
import messageRoutes from "./messageRoutes"
import adminRoutes from "./adminRoutes"

export default function routes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.addHook("onError", (_req, _reply, error, done) => {
        fastify.log.error(error)
        done()
    })

    fastify.get("/", (req, reply) => { reply.status(200).send("Ok") })

    fastify.register(projectRoutes, { prefix: "/project" })
    fastify.register(skillRoutes, { prefix: "/skill" })
    fastify.register(messageRoutes, { prefix: "/message" })
    fastify.register(adminRoutes, { prefix: "/admin" })

    done()
}