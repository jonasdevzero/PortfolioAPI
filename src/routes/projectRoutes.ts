import { FastifyPluginOptions, FastifyInstance } from "fastify"
import ProjectController from "../controllers/ProjectController"
import authHook from "../hooks/authHook"
import projectSchema from "./schema/projectSchema"

export default function projectRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", {
        schema: projectSchema.index
    }, ProjectController.index)

    fastify.get("/:id", {
        schema: projectSchema.show,
    }, ProjectController.show)

    fastify.post("/", {
        schema: projectSchema.create,
        preValidation: authHook,
    }, ProjectController.create)

    fastify.put("/:id", {
        schema: projectSchema.update,
        preValidation: authHook,
    }, ProjectController.update)

    fastify.delete("/:id", {
        schema: projectSchema.delete,
        preValidation: authHook,
    }, ProjectController.delete)

    done()
}
