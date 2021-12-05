import { FastifyPluginOptions, FastifyInstance } from "fastify"
import MessageController from "../controllers/MessageController"
import authHook from "../hooks/authHook"
import messageSchema from "./schema/messageSchema"

export default function messageRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", {
        schema: messageSchema.index,
        preValidation: authHook,
    }, MessageController.index)

    fastify.get("/:id", {
        schema: messageSchema.show,
        preValidation: authHook,
    }, MessageController.show)

    fastify.post("/", {
        schema: messageSchema.create,
    }, MessageController.create)

    fastify.patch("/:id", {
        schema: messageSchema.update,
        preValidation: authHook,
    }, MessageController.update)

    done()
}
