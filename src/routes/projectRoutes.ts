import { FastifyPluginOptions, FastifyInstance } from "fastify"
import ProjectController from "../controllers/ProjectController"
import authHook from "../hooks/authHook"

export default function projectRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", ProjectController.index)

    fastify.get("/:id", ProjectController.show)

    fastify.post("/", {
        preValidation: authHook
    }, ProjectController.create)

    fastify.put("/:id", {
        preValidation: authHook
    }, ProjectController.update)

    fastify.delete("/:id", {
        preValidation: authHook
    }, ProjectController.delete)

    done()
}
