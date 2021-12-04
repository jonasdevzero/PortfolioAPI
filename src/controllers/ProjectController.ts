import { getRepository } from "typeorm"
import Project from "../models/Project"
import { ServerRequest, ServerReply } from "../types/controller"

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            const projectRepository = getRepository(Project)
            const projects = await projectRepository.find()

            return reply.status(200).send({ projects })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async show(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.params.id

            const projectRepository = getRepository(Project)
            const project = projectRepository.findOne(id)

            if (!project)
                return reply.status(404).send({ message: "Project not found!" })

            return reply.status(200).send({ project })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async create(req: ServerRequest, reply: ServerReply) {
        try {
            const {
                name,
                description,
                html,
                repository_link,
                website_link,
                images
            } = req.body

            
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

    async delete(req: ServerRequest, reply: ServerReply) {
        try {
            // ...
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}
