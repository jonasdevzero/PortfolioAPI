import { FastifyPluginOptions, FastifyInstance } from "fastify"
import AdminController from "../controllers/AdminController"
import authHook from "../hooks/authHook"

export default function adminRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", {
        preValidation: authHook
    }, AdminController.index)

    fastify.post("/", AdminController.create)

    fastify.patch("/:id", {
        preValidation: authHook
    }, AdminController.update)

    done()
}
