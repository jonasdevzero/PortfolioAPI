import { FastifyPluginOptions, FastifyInstance } from "fastify"
import SkillController from "../controllers/SkillController"
import authHook from "../hooks/authHook"

export default function skillRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get("/", SkillController.index)

    fastify.post("/", {
        preValidation: authHook
    }, SkillController.create)

    fastify.put("/:id", {
        preValidation: authHook
    }, SkillController.update)

    fastify.delete("/:id", {
        preValidation: authHook
    }, SkillController.delete)

    done()
}
