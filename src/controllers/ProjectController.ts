import { getRepository } from "typeorm"
import * as yup from "yup"
import Project from "../models/Project"
import ProjectImage from "../models/ProjectImage"
import { ServerRequest, ServerReply } from "../types/controller"

export default {
    async index(req: ServerRequest, reply: ServerReply) {
        try {
            let { limit, skip } = req.query

            limit = limit > 0 ? limit : 5
            skip = ((skip > 0 ? skip : 0) * limit)

            const projectRepository = getRepository(Project)
            const projects = await projectRepository.find({ 
                relations: ["images"],
                take: limit,
                skip,
                order: { created_at: "DESC" }
            })

            return reply.status(200).send({ projects })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async show(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.params.id            

            const projectRepository = getRepository(Project)
            const project = await projectRepository.findOne(id, { relations: ["images"] })

            if (!project)
                return reply.status(404).send({ message: "Project not found!" })

            return reply.status(200).send({ project })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async create(req: ServerRequest, reply: ServerReply) {
        try {
            const { name, banner_url, description, html, repository_link, website_link, video_demo, images } = req.body

            const schema = yup.object().shape({
                name: yup.string().required(),
                banner_url: yup.string().required(),
                description: yup.string().required(),
                html: yup.string().required(),
                repository_link: yup.string().required(),
                website_link: yup.string(),
                video_demo: yup.string(),
                images: yup.array().of(yup.object().shape({
                    url: yup.string()
                })).required(),
            })

            let validationError: any
            await schema.validate(req.body).catch((err: any) => validationError = err)

            if (validationError)
                return reply.status(400).send({ message: validationError.errors[0] })

            const projectRepository = getRepository(Project)
            const projectImageRepository = getRepository(ProjectImage)

            const project = await projectRepository.create({ name, banner_url, description, html, repository_link, website_link, video_demo }).save()
            await Promise.all(images.map(({ url }: { url: string }) => 
                projectImageRepository.create({ url, project_id: project.id, project }).save()))

            reply.status(201).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async update(req: ServerRequest, reply: ServerReply) {
        try {
            const id = req.params.id as string
            const { name, description, html, repository_link, website_link, video_demo, remove_images, new_images } = req.body
            
            const projectRepository = getRepository(Project)

            const project = await projectRepository.findOne(id)

            if (!project)
                return reply.status(404).send({ message: "Project not found!" })

            const schema = yup.object().shape({
                name: yup.string().required(),
                banner_url: yup.string().required(),
                description: yup.string().required(),
                html: yup.string().required(),
                repository_link: yup.string().required(),
                website_link: yup.string(),
                video_demo: yup.string(),
            })

            let validationError: any
            await schema.validate(req.body).catch((err: any) => validationError = err)

            if (validationError)
                return reply.status(400).send({ message: validationError.errors[0] })

            const projectImageRepository = getRepository(ProjectImage)
            await Promise.all([
                projectRepository.update(project.id, { name, description, html, repository_link, website_link, video_demo }),
                ...remove_images?.map(({ id }: { id: string }) => projectImageRepository.delete(id)),
                ...new_images?.map(({ url }: { url: string }) => projectImageRepository.create({ url, project_id: project.id, project }).save())
            ])

            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },

    async delete(req: ServerRequest, reply: ServerReply) {
        try {
            const project_id = req.params.id as string

            const projectRepository = getRepository(Project)
            const project = await projectRepository.findOne(project_id)

            if  (!project)
                return reply.status(404).send({ message: "Project not found!" })

            await projectRepository.delete(project)

            reply.status(200).send({ message: "Ok" })
        } catch (error) {
            reply.status(500).send({ message: "Internal Server Error", error })
        }
    },
}
