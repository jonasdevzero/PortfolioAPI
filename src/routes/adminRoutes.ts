import { FastifyPluginOptions, FastifyInstance } from "fastify"
import AdminController from "../controllers/AdminController"
import authHook from "../hooks/authHook"
import adminSchema from "./schema/adminSchema"

export default function adminRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", {
        schema: adminSchema.index,
        preValidation: authHook,
    }, AdminController.index)

    fastify.post("/", {
        schema: adminSchema.create,
    }, AdminController.create)

    fastify.patch("/:id", {
        schema: adminSchema.update,
        preValidation: authHook,
    }, AdminController.update)

    done()
}
