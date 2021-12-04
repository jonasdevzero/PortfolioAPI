import { FastifyPluginOptions, FastifyInstance } from "fastify"
import MessageController from "../controllers/MessageController"
import authHook from "../hooks/authHook"
import messageSchema from "./schema/messageSchema"

export default function messageRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.addHook("preValidation", authHook)

    fastify.get("/", {
        schema: messageSchema.index,
    }, MessageController.index)

    fastify.get("/:id", {
        schema: messageSchema.show,
    }, MessageController.show)

    fastify.patch("/:id", {
        schema: messageSchema.update,
    }, MessageController.update)

    done()
}
