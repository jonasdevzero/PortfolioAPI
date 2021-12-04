import { FastifyPluginOptions, FastifyInstance } from "fastify"
import MessageController from "../controllers/MessageController"
import authHook from "../hooks/authHook"

export default function messageRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.addHook("preValidation", authHook)

    fastify.get("/", MessageController.index)

    fastify.get("/:id", MessageController.show)

    fastify.patch("/:id", MessageController.update)

    done()
}
