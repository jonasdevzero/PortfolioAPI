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

    fastify.post("/login", {
        schema: adminSchema.login,
    }, AdminController.login)

    fastify.post("/auth", {
        schema: adminSchema.auth,
        preValidation: authHook,
    }, AdminController.auth)

    fastify.put("/", {
        schema: adminSchema.update,
        preValidation: authHook,
    }, AdminController.update)

    fastify.patch("/activated/:id", {
        schema: adminSchema.updateActivity,
        preValidation: authHook,
    }, AdminController.updateActivity)

    done()
}
