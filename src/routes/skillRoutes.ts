import { FastifyPluginOptions, FastifyInstance } from "fastify"
import SkillController from "../controllers/SkillController"
import authHook from "../hooks/authHook"
import skillSchema from "./schema/skillSchema"

export default function skillRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", {
        schema: skillSchema.index,
    }, SkillController.index)

    fastify.post("/", {
        schema: skillSchema.create,
        preValidation: authHook,
    }, SkillController.create)

    fastify.put("/:id", {
        schema: skillSchema.update,
        preValidation: authHook,
    }, SkillController.update)

    fastify.delete("/:id", {
        schema: skillSchema.delete,
        preValidation: authHook,
    }, SkillController.delete)

    done()
}
