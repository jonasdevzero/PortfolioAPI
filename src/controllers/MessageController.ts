import { ServerRequest, ServerReply } from "../types/controller"

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            // ...
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async show(req: ServerRequest, reply: ServerReply) {
        try {
            // ...
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async update(req: ServerRequest, reply: ServerReply) {
        try {
            // ...
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}
